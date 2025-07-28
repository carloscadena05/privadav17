import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DonationsSearchResult } from 'src/app/_shared/models/neon/donations.interface';
import { SearchFieldsFilter } from 'src/app/_shared/models/neon/search-fields.interface';
import { NeonService } from 'src/app/_shared/services/neon.service';
import { ProviderService } from 'src/app/_shared/services/provider.service';
import { FilterComponent } from './filter/filter.component';
import { AppliedFiltersComponent } from './applied-filters/applied-filters.component';
import { DatePipe, DecimalPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableUtil } from './table-util';

@Component({
  selector: 'app-export-donations',
  standalone: true,
  imports: [AppliedFiltersComponent, NgClass, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, NgTemplateOutlet, DatePipe, DecimalPipe],
  templateUrl: './export-donations.component.html',
  styleUrl: './export-donations.component.css'
})
export class ExportDonationsComponent  {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    donations: DonationsSearchResult[] = [];
    displayedColumns: string[] = ["Name", "Donation Date", "Donation Amount", "Email 1", "Address Line 1", /* "Address Line 2", "Address Line 3", "Address Line 4" */ /* "Pledge Amount",  "Donation Type", */];

    constructor(
        private provider: ProviderService,
        private dialog: MatDialog,

        public neon: NeonService
    ) { }

    async ngOnInit() {
        await this.neon.join_donations();
        await this.set_table_properties();
        this.neon.update_table_properties.subscribe(async (data: boolean) => {
            if (data) 
                setTimeout(async () => await this.set_table_properties(), 100);     
            // await this.set_table_properties(), 100
        }
        )
    }

    get_full_address(row: any): string {
        return [
            row?.['Address Line 1'],
            row?.['Address Line 2'],
            row?.['Address Line 3'],
            row?.['Address Line 4']
        ].filter(Boolean).join(', ');
    }


    open_filter_dialog() {
        this.dialog.open(FilterComponent, {
            width: '80%'
        }).afterClosed().subscribe((data: SearchFieldsFilter[]) => {
            if (data != undefined && data?.length > 1)
                this.neon.join_donations();
        })
    }

    async set_table_properties() {
        this.neon.dataSource.sort = await this.sort;
        this.neon.dataSource.paginator = await this.paginator;
    }

    download_table() {
    const originalPageSize = this.paginator.pageSize;
    
    this.paginator.pageSize = this.neon.dataSource.data.length;
    this.paginator._changePageSize(this.paginator.pageSize);
    
    setTimeout(() => {
        TableUtil.exportTableToExcel("donations", `Donations`);
        
        this.paginator.pageSize = originalPageSize;
        this.paginator._changePageSize(originalPageSize);
    });
}
}