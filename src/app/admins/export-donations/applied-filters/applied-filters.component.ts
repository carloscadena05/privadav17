import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SearchFieldsFilter } from 'src/app/_shared/models/neon/search-fields.interface';
import { NeonService } from 'src/app/_shared/services/neon.service';
/* import { SearchFieldsFilter } from 'src/app/shared/models/search-fields.interface';
import { NeonService } from 'src/app/shared/services/neon.service'; */

@Component({
    selector: 'app-applied-filters',
    templateUrl: './applied-filters.component.html',
    styleUrls: ['./applied-filters.component.scss'],
    imports: [NgTemplateOutlet],
    standalone: true,
})
export class AppliedFiltersComponent implements OnInit {
    @Input() reload_after_deleting: boolean = false;
    @Output() set_table_properties: EventEmitter<boolean> = new EventEmitter

    constructor(
        public neon: NeonService
    ) { }

    ngOnInit(): void {
    }

    async update_donations() {
        await this.neon.join_donations(); 
        await this.set_table_properties.emit(true)
    }

    group_donations() {        
        this.neon.group_donations = !this.neon.group_donations;

        if(this.reload_after_deleting)
            this.update_donations();
    }

    delete_filter(field: SearchFieldsFilter) {
        const index = this.neon.donations_applied_filters.findIndex((field_to_use: SearchFieldsFilter) => field_to_use.field == field.field)
        if (index != -1)
            this.neon.donations_applied_filters.splice(index, 1)

        const index_array = this.array_filters().value.findIndex((field_to_use: SearchFieldsFilter) => field_to_use.field == field.field)

        const value: SearchFieldsFilter = {
            operator: null,
            field: this.array_filters().at(index_array).value.field,
            operators_to_use: this.array_filters().at(index_array).value.operators_to_use,
            value: null,
            valueList: ['', '']
        };

        (<FormGroup>this.array_filters().at(index_array)).patchValue(value);
    }

    array_filters(): FormArray {
        return <FormArray>this.neon.donations_filters_form.controls['filters'];
    }

}
