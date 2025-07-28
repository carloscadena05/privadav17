import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchFields, SearchFieldsFilter, StandardFields } from 'src/app/_shared/models/neon/search-fields.interface';
import { FormService } from 'src/app/_shared/services/form.service';
import { NeonService } from 'src/app/_shared/services/neon.service';
import { ProviderService } from 'src/app/_shared/services/provider.service';
import { Properties } from 'src/app/_shared/models/neon/properties.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AppliedFiltersComponent } from '../applied-filters/applied-filters.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
/* 
import { SearchFields, SearchFieldsFilter, StandardFields } from 'src/app/shared/models/search-fields.interface';
import { Sponsors } from 'src/app/shared/models/sponsors.interface';
import { FormService } from 'src/app/shared/services/form.service';
import { NeonService } from 'src/app/shared/services/neon.service';
import { ProviderService } from 'src/app/shared/services/provider.service'; */

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, NgClass, MatDialogModule, AppliedFiltersComponent, MatCheckboxModule, MatRadioModule, FormsModule]
})
export class FilterComponent implements OnInit {
    search_fields!: StandardFields[];
    // form: FormGroup;
    query: string = '';
    icons: any = {
        "EQUAL": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M4 8H20" stroke="#24384d" stroke-width="1.5" stroke-linecap="round"></path>
                <path d="M4 16H20" stroke="#24384d" stroke-width="1.5" stroke-linecap="round"></path>
            </svg>
        `),
        "NOT_EQUAL": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M4 8H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M4 16H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M6 20L18 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
        `),
        "BLANK": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M19 12L21.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5 12L16 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 12L10.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.5 12H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `),
        "NOT_BLANK": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M3 3H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 9H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 15H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 21H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `),
        "LESS_THAN": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M17 4L8.66943 10.0405C6.44352 11.6545 6.44353 12.3455 8.66943 13.9595L17 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `),
        "GREATER_THAN": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M7 4L15.3306 10.0405C17.5565 11.6545 17.5565 12.3455 15.3306 13.9595L7 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `),
        "LESS_AND_EQUAL": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M17 4L8.66943 10.0405C6.44352 11.6545 6.44353 12.3455 8.66943 13.9595L17 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M 19 22 H 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `),
        "GREATER_AND_EQUAL": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M7 4L15.3306 10.0405C17.5565 11.6545 17.5565 12.3455 15.3306 13.9595L7 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M 19 22 H 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `),
        "IN_RANGE": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M5 9C4.39316 9.58984 2 11.1597 2 12C2 12.8403 4.39316 14.4102 5 15" stroke="#24384d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M19 9C19.6068 9.58984 22 11.1597 22 12C22 12.8403 19.6068 14.4102 19 15" stroke="#24384d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M2.42285 11.9795H21.868" stroke="#24384d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        `),
        "NOT_IN_RANGE": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M5 9C4.39316 9.58984 2 11.1597 2 12C2 12.8403 4.39316 14.4102 5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 9C19.6068 9.58984 22 11.1597 22 12C22 12.8403 19.6068 14.4102 19 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.42285 11.9795H21.868" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 20L18 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
        `),
        "CONTAIN": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M18.0172 18.0169C16.4796 19.5511 14.3574 20.4997 12.0137 20.4997C7.31925 20.4997 3.51367 16.6941 3.51367 11.9997C3.51367 9.65593 4.46225 7.53375 5.99643 5.99609" stroke="currentColor" stroke-width="1.5" />
                <path d="M8.33594 4.32282C9.4491 3.79546 10.6968 3.5 12.0145 3.5C16.709 3.5 20.5145 7.24977 20.5145 11.8753C20.5145 13.1738 20.2147 14.4032 19.6795 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M 17.8577 13.3408 V 15.8721 M 17.8577 13.3408 C 17.8842 12.8778 17.8852 12.5251 17.8297 12.2372 C 17.6986 11.5587 16.9896 11.1497 16.3034 11.0665 C 15.6467 10.9869 15.1196 11.1559 14.5863 11.9329 M 17.8577 13.3408 L 16.2582 13.3408 C 16.0124 13.3408 15.7646 13.3527 15.5278 13.4185 C 14.0807 13.8208 14.1867 15.8501 15.6381 16.1003 C 15.7993 16.1281 15.9639 16.14 16.1271 16.1327 C 16.5083 16.1157 16.8599 15.9316 17.1618 15.6982 C 17.5153 15.4247 17.8577 15.0431 17.8577 14.4658 V 13.3408 Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M 12.375 15.1875 L 10.7477 10.5457 C 9.9919 8.3902 9.6141 7.3125 9 7.3125 C 8.3859 7.3125 8.0081 8.3902 7.2523 10.5457 L 5.625 15.1875 M 7.0313 11.25 H 10.9688" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `),
        "NOT_CONTAIN": this.sanitizer.bypassSecurityTrustHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#24384d" fill="none">
                <path d="M18.0172 18.0169C16.4796 19.5511 14.3574 20.4997 12.0137 20.4997C7.31925 20.4997 3.51367 16.6941 3.51367 11.9997C3.51367 9.65593 4.46225 7.53375 5.99643 5.99609" stroke="currentColor" stroke-width="1.5" />
                <path d="M2 2L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.33594 4.32282C9.4491 3.79546 10.6968 3.5 12.0145 3.5C16.709 3.5 20.5145 7.24977 20.5145 11.8753C20.5145 13.1738 20.2147 14.4032 19.6795 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M 17.8577 13.3408 V 15.8721 M 17.8577 13.3408 C 17.8842 12.8778 17.8852 12.5251 17.8297 12.2372 C 17.6986 11.5587 16.9896 11.1497 16.3034 11.0665 C 15.6467 10.9869 15.1196 11.1559 14.5863 11.9329 M 17.8577 13.3408 L 16.2582 13.3408 C 16.0124 13.3408 15.7646 13.3527 15.5278 13.4185 C 14.0807 13.8208 14.1867 15.8501 15.6381 16.1003 C 15.7993 16.1281 15.9639 16.14 16.1271 16.1327 C 16.5083 16.1157 16.8599 15.9316 17.1618 15.6982 C 17.5153 15.4247 17.8577 15.0431 17.8577 14.4658 V 13.3408 Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M 12.375 15.1875 L 10.7477 10.5457 C 9.9919 8.3902 9.6141 7.3125 9 7.3125 C 8.3859 7.3125 8.0081 8.3902 7.2523 10.5457 L 5.625 15.1875 M 7.0313 11.25 H 10.9688" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `)
    }
    fields_with_select: string[] = ['Donation Year', 'Address Type', 'Company Type', 'Country', 'Gender', 'Individual Type', 'Account ID'];

    /* 
    * Properties
    */
    properties: {
        [key: string]: Properties[];
    } = {
            'Address Type': [],
            'Company Type': [],
            'Country': [],
            'Gender': [],
            'Individual Type': [],
            'Account ID': [],
        };

    custom_filter_fields: StandardFields[] = [
        {
            fieldName: 'Donation Year',
            operators: [
                "EQUAL",
                "NOT_EQUAL",
                "LESS_THAN",
                "GREATER_THAN",
                "LESS_AND_EQUAL",
                "GREATER_AND_EQUAL",
                "IN_RANGE",
                "NOT_IN_RANGE"
            ],
        }/* ,
        {
            id: 'Group by year',
            name: 'Group by year',
            status: '',
            operators_to_use: [],
            operator: '',
            valueList: []
        }
 */
    ]

    constructor(
        private provider: ProviderService,
        private form: FormService,
        private form_builder: FormBuilder,
        private sanitizer: DomSanitizer,

        public neon: NeonService,
    ) {
    }

    async ngOnInit() {
        await this.get_search_fields();
        await this.get_properties();
    }

    async get_search_fields() {
        this.search_fields = <StandardFields[]>(<SearchFields>await this.provider.production('GET', '/neon/donations/search/searchFields')).standardFields;

        this.search_fields = await [
            ...this.custom_filter_fields,
            ...this.search_fields
        ];

        this.search_fields.forEach((search_field: StandardFields) => {
            this.array_filters().push(this.search_fields_to_use_form(search_field.fieldName, search_field.operators))
        });

        this.neon.donations_applied_filters.forEach((filter: SearchFieldsFilter) => {
            let i: number = this.find_filter_index(filter.field);
            console.log(this.array_filters().at(i).value, filter);
            this.form.patch(filter, <FormGroup>this.array_filters().at(i))
            // this.array_filters().at(i).patchValue(filter);
        })
    }

    async add_filter(data: SearchFieldsFilter) {
        const new_data: SearchFieldsFilter = { ...data };

        const index = this.neon.donations_applied_filters.findIndex((field_to_use: SearchFieldsFilter) => field_to_use.field == new_data.field)
        if (index != -1)
            this.neon.donations_applied_filters.splice(index, 1)

        delete new_data.operators_to_use

        if (['IN_RANGE', 'NOT_IN_RANGE'].includes(new_data.operator as string))
            delete new_data.value
        else
            delete new_data.valueList

        if (new_data.field.includes('Date')) {
            const d = new Date(new_data.value!);
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const year = d.getFullYear();

            new_data.value = `${year}-${month}-${day}`;
        }

        if(!this.custom_filter_fields.map((field: StandardFields) => field.fieldName).includes(new_data.field))
            this.neon.donations_applied_filters.push(new_data);
        else
            this.neon.donations_custom_applied_filters.push(new_data);
    }

    delete_filter(field: SearchFieldsFilter) {
        const index = this.neon.donations_applied_filters.findIndex((field_to_use: SearchFieldsFilter) => field_to_use.field == field.field)
        if (index != -1)
            this.neon.donations_applied_filters.splice(index, 1)

        const index_array = this.find_filter_index(field.field)

        const value: SearchFieldsFilter = {
            operator: null,
            field: this.array_filters().at(index_array).value.field,
            operators_to_use: this.array_filters().at(index_array).value.operators_to_use,
            value: null,
            valueList: ['', '']
        };

        (<FormGroup>this.array_filters().at(index_array)).patchValue(value);
    }

    find_filter_index(field: string) {
        return this.array_filters().value.findIndex((field_to_use: SearchFieldsFilter) => field_to_use.field == field)
    }

    async change_validators(operator: string, field: AbstractControl) {
        const group = field as FormGroup;

        const value_control = group.get('value');
        const value_list = group.get('valueList');

        group.controls['operator'].patchValue(operator);

        if (this.range_options(field.value)) {
            if (value_list instanceof FormArray) {
                console.log(group.value, group.value.valueList);

                if (!group.value.valueList.length) {
                    group.addControl('valueList', this.form_builder.array([]))
                    this.array_value_list(group).push(this.form_builder.control(''))
                }

                console.log(group.value, group.value.valueList);

                value_list.controls.forEach(control => control.setValidators([Validators.required]));
                value_list.controls.forEach(control => control.updateValueAndValidity());
                group.removeControl('value');
            }
            value_control?.clearValidators();
            value_control?.updateValueAndValidity();
        } else if (this.blank_options(field.value)) {
            value_control?.clearValidators();
            value_control?.setValue('');
            value_control?.updateValueAndValidity();
            if (value_list instanceof FormArray) {
                value_list.controls.forEach(control => {
                    control.clearValidators();
                    control.setValue('');
                    control.updateValueAndValidity();
                });
            }
        } else {
            value_control?.setValidators([Validators.required]);
            value_control?.updateValueAndValidity();
            if (value_list instanceof FormArray) {
                value_list.controls.forEach(control => {
                    control.clearValidators();
                    control.updateValueAndValidity();
                });
            }
        }
        group.get('operator')?.setValue(operator);
    }

    add_to_value_list(field: AbstractControl) {
        this.array_value_list(field).push(this.form_builder.control(''));
        field.updateValueAndValidity();
    }

    remove_at_value_list(field: AbstractControl, index: number) {
        this.array_value_list(field).removeAt(index);
        field.updateValueAndValidity();
    }

    async get_properties() {
        const currentYear = new Date().getFullYear();
        this.properties['Donation Year'] = [];

        for (let year = currentYear; year >= 2001; year--) {
            this.properties['Donation Year'].push({ id: '', name: year.toString(), status: '' });
        }
        this.properties['Address Type'] = <Properties[]>await this.neon.get_properties('addressTypes')
        this.properties['Company Type'] = <Properties[]>await this.neon.get_properties('companyTypes')
        this.properties['Country'] = <Properties[]>await this.neon.get_properties('countries')
        this.properties['Gender'] = <any[]>await this.neon.get_properties('Genders')
        this.properties['Individual Type'] = <Properties[]>await this.neon.get_properties('individualTypes')
        this.properties['Account ID'] = (<any>(<any>await this.provider.production('GET', '/neon/accounts?userType=INDIVIDUAL')).accounts).
            filter((account: any) => account.firstName != '' && account.lastName != '' && account.firstName != null && account.lastName != null).
            map((account: any) => {
                return {
                    id: account.accountId,
                    name: account.firstName + ' ' + account.lastName
                }
            })

        // console.log(this.properties);

    }

    array_filters(): FormArray {
        return <FormArray>this.neon.donations_filters_form.controls['filters'];
    }

    array_value_list(field: AbstractControl) {
        return <FormArray>field.get('valueList')
    }

    search_fields_to_use_form(field: string, operators: string[]) {
        return this.form_builder.group({
            field: [field, Validators.required],
            operator: [null, Validators.required],
            value: [null],
            operators_to_use: [operators],
            valueList: this.form_builder.array([])
        })
    }

    async all_filters_added() {
        const applied_filters: string = await this.neon.donations_applied_filters.map((filter: SearchFieldsFilter) => filter.field).sort().join();
        const form_filters: string = await this.neon.donations_filters_form.value.filters.filter((filter: SearchFieldsFilter) => filter.value?.length! >= 1 || filter.valueList?.length! >= 1).map((filter: SearchFieldsFilter) => filter.field).sort().join();

        return applied_filters == form_filters;
    }

    normalize(query: string) {
        return new RegExp(
            query
                .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                .toLowerCase()
                .split('')
                .join('.*?'),
            'i'
        );
    }

    range_options(field: SearchFieldsFilter) {
        return field.operator == 'IN_RANGE' || field.operator == 'NOT_IN_RANGE' && !field.field.includes('Date') && !this.fields_with_select.includes(field.field);
    }

    blank_options(field: SearchFieldsFilter) {
        return field.operator == 'BLANK' || field.operator == 'NOT_BLANK' && !field.field.includes('Date') && !this.fields_with_select.includes(field.field);
    }

    date_options(field: SearchFieldsFilter) {
        return field.operator != 'IN_RANGE' && field.operator != 'NOT_IN_RANGE' && field.operator != 'BLANK' && field.operator != 'NOT_BLANK' && field.field.includes('Date') && !this.fields_with_select.includes(field.field);
    }

    select_options(field: SearchFieldsFilter) {
        return field.operator != 'IN_RANGE' && field.operator != 'NOT_IN_RANGE' && field.operator != 'BLANK' && field.operator != 'NOT_BLANK' && !field.field.includes('Date') && this.fields_with_select.includes(field.field);
    }

    default_options(field: SearchFieldsFilter) {
        return field.operator != 'IN_RANGE' && field.operator != 'NOT_IN_RANGE' && field.operator != 'BLANK' && field.operator != 'NOT_BLANK' && !field.field.includes('Date') && !this.fields_with_select.includes(field.field);
    }

    date_range_options(field: SearchFieldsFilter) {
        return field.field.includes('Date') && !this.fields_with_select.includes(field.field);
    }

    select_range_options(field: SearchFieldsFilter) {
        return !field.field.includes('Date') && this.fields_with_select.includes(field.field);
    }

    default_range_options(field: SearchFieldsFilter) {
        return !field.field.includes('Date') && !this.fields_with_select.includes(field.field);
    }

    @HostListener('window:resize')
    hola() { }


    log_errors(field: AbstractControl) {
        console.log(field, field.errors, field.invalid);
        field.markAllAsTouched();

    }

    col_span(number: number) {
        if (number + 1 <= 4)
            return `col-span-${number + 1} grid-cols-${number + 1}`
        return 'col-span-4 grid-cols-4'
    }
}
