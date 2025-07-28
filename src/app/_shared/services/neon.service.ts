import { Injectable, ViewChild } from '@angular/core';
import { ProviderService } from './provider.service';
import { SearchFieldsFilter } from '../models/neon/search-fields.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DonationsSearch, DonationsSearchResult } from '../models/neon/donations.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NeonService {


    donations_applied_filters: SearchFieldsFilter[] = [
        {
            "field": "Account Type",
            "operator": "EQUAL",
            "value": "INDIVIDUAL"
        },
        {
            "field": "Donation Type",
            "operator": "IN_RANGE",
            "valueList": ["Donation", "Match Pledge", "Pledge Payment",],/*  "Pledge",  */
        },
        {
            "field": "Donation Status",
            "operator": "EQUAL",
            "value": "Succeeded",
        }
    ];

    donations_custom_applied_filters: SearchFieldsFilter[] = []
    donations_filters_form: FormGroup;
    group_donations: boolean = true;
    loading: boolean = false;
    dataSource!: MatTableDataSource<any>;
    update_table_properties: BehaviorSubject<boolean> = new BehaviorSubject(false)


    constructor(
        private form_builder: FormBuilder,
        private provider: ProviderService,
    ) {
        this.donations_filters_form = form_builder.group({
            filters: form_builder.array([])
        })
    }

    async get_properties(url: string) {
        return await this.provider.production('GET', '/neon/properties/' + url);
    }

    async join_donations() {
        this.loading = true;
        const data = this.donations_applied_filters;
        let donations_recurring: DonationsSearchResult[] = await this.get_donations(data, true);

        let donations_not_recurring: DonationsSearchResult[] = await this.get_donations(data, false);

        let joined_donations: DonationsSearchResult[] = [
            ...donations_not_recurring,
            ...donations_recurring
        ];

        joined_donations = await this.delete_duplicates(joined_donations);

        if (this.group_donations)
            joined_donations = await this.group_donations_by_year(joined_donations);

        const donation_year = await this.donations_custom_applied_filters.find((filter: SearchFieldsFilter) => filter.field == 'Donation Year');
        
        if (donation_year?.operator) {
            joined_donations = await this.compare_years_2(joined_donations, donation_year.value ?? donation_year.valueList as any, donation_year.operator)
        }
        
        this.dataSource = await new MatTableDataSource(joined_donations);
        
        setTimeout(async () => {
            await this.update_table_properties.next(true);
        }, 100);

        this.loading = false;
    }

    async get_donations(SearchFields: SearchFieldsFilter[], is_recurring: boolean) {

        if (is_recurring) {
            SearchFields = [
                ...SearchFields,
                {
                    "field": "Recurring Donation Schedule ID",
                    "operator": "NOT_BLANK",
                    "valueList": [],
                    "value": "Succeeded",
                    "operators_to_use": ["", ""],
                }
            ];
        }

        let partial_donations: DonationsSearchResult[] = [];
        let partial_joined_donations: DonationsSearchResult[] = [];
        let i: number = 0;

        do {
            if (i > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            partial_donations = (<DonationsSearch>await this.provider.production('POST', '/neon/donations/search', {
                body: {
                    "searchFields": SearchFields,
                    "outputFields": [
                        "First Name",
                        "Last Name",
                        "Donation Date",
                        "Donation Amount",
                        "Account ID",
                        "Donation Type",
                        "Email 1",
                        "Address Line 1",
                        "Address Line 2",
                        "Address Line 3",
                        "Address Line 4",

                        "Pledge Amount",
                        "Donation ID",
                    ],
                    "pagination": {
                        "currentPage": i,
                        "pageSize": 200,
                        "sortColumn": "Donation Amount",
                        "sortDirection": "DESC",
                        "totalPages": 0,
                        "totalResults": 0
                    }
                }
            })).searchResults;

            partial_joined_donations = [
                ...partial_joined_donations,
                ...partial_donations
            ];

            i++;
        } while (partial_donations.length === 200 || !partial_joined_donations.length);

        return partial_joined_donations;
    }

    async group_donations_by_year(donations: DonationsSearchResult[]): Promise<DonationsSearchResult[]> {
        return Object.values(
            donations.reduce((acc: any, curr: any) => {
                const donationDate = curr?.['Donation Date'];
                const year = new Date(donationDate).getFullYear();
                const key = `${curr?.['Account ID']}_${year}`;

                const amount = parseFloat(curr?.['Donation Amount']);
                if (!acc[key]) {
                    acc[key] = { ...curr, year };
                    acc[key]['Donation Amount'] = amount;
                } else {
                    acc[key]['Donation Amount'] += amount;
                }

                return acc;
            }, {})
        );
    }

    async delete_duplicates(donations: DonationsSearchResult[]): Promise<DonationsSearchResult[]> {
        return Array.from(
            new Map(donations.map(d => [d["Donation ID"], d])).values()
        );
    }

    async compare_years_2(donations: DonationsSearchResult[], value: string | string[], operator: string | null) {
        return donations.filter((donation) => {
            const year = new Date(donation['Donation Date'] ?? '').getFullYear();
            switch (operator) {
                case "EQUAL": return year === Number(value);
                case "NOT_EQUAL": return year !== Number(value);
                case "LESS_THAN": return year < Number(value);
                case "GREATER_THAN": return year > Number(value);
                case "LESS_AND_EQUAL": return year <= Number(value);
                case "GREATER_AND_EQUAL": return year >= Number(value);
                case "IN_RANGE": return Array.isArray(value) && value.map(Number).includes(year);
                case "NOT_IN_RANGE": return Array.isArray(value) && !value.map(Number).includes(year);
                default: return false;
            }
        });
    }


    async compare_years(val: any, op: string, a: any): Promise<boolean> {
        val = await new Date(val).getFullYear();
        console.log(val, op, a, val == a);

        switch (op) {
            case "EQUAL": return await (val == a);
            case "NOT_EQUAL": return await (val != a);
            case "LESS_THAN": return await (val < a);
            case "GREATER_THAN": return await (val > a);
            case "LESS_AND_EQUAL": return await (val <= a);
            case "GREATER_AND_EQUAL": return await (val >= a);
            case "IN_RANGE": return await (Array.isArray(a) && a.includes(val));
            case "NOT_IN_RANGE": return await (Array.isArray(a) && !a.includes(val));
            default: return await false;
        }
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
