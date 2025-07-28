import { animate, state, style, transition, trigger } from '@angular/animations';
import { CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomField } from 'src/app/_shared/models/neon/custom-field.interface';
import { SponsorsAssign, StudentsAssign } from 'src/app/_shared/models/neon/donations.interface';
import { AccountCustomFields, Sponsor } from 'src/app/_shared/models/neon/sponsor.interface';
import { FormService } from 'src/app/_shared/services/form.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { MasterService } from 'src/app/_shared/services/master.service';
import { ProviderService } from 'src/app/_shared/services/provider.service';

@Component({
  selector: 'app-sponsor-student-match',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, NgStyle, DecimalPipe, NgTemplateOutlet, NgClass, DatePipe, MatTooltipModule, JsonPipe, CurrencyPipe],
  templateUrl: './sponsor-student-match.component.html',
  styleUrl: './sponsor-student-match.component.scss',
  animations: [
        trigger('expand', [
            state('closed', style({
                height: '0',
                opacity: 0,
                visibility: 'hidden',
                overflow: 'hidden'
            })),
            state('opened', style({
                height: '*',
                opacity: 1,
                visibility: 'visible',
                overflow: 'hidden'
            })),
            transition('closed <=> opened', animate('300ms ease-in-out'))
        ]),

        trigger('change-size', [
            state('closed',
                style({
                    height: '112px',
                    opacity: '100'
                })
            ),
            state('opened',
                style({
                    height: '260px',
                    opacity: '100'
                }),
            ),
            transition('closed <=> opened', animate('300ms ease-in'))
        ])
    ]
})
export class SponsorStudentMatchComponent {
  current_year: number = /* new Date().getFullYear */ 2025;

  form = this.form_builder.group({
    config: this.form_builder.group({
      dollar: [18.5, Validators.required],
      current_year: [this.current_year, Validators.required],
/*       operation_cost: [21600, Validators.required],
 */      laptop_cost: [14000, Validators.required],
      current_monthly_payment: [2500, Validators.required],
      pledge_exchange_rate: [19, Validators.required]
    }),
    sponsors: this.form_builder.array([]),
    students: this.form_builder.array([]),
    matched: this.form_builder.array([])
  });

  pledges_search_fields = [
    {
      "field": "Account Type",
      "operator": "EQUAL",
      "value": "INDIVIDUAL"
    },
    {
      "field": "Donation Type",
      "operator": "IN_RANGE",
      "valueList": [
        "Pledge"
      ]
    },
    {
      "field": "Donation Status",
      "operator": "EQUAL",
      "value": "Succeeded"
    }
  ];

  sponsors: SponsorsAssign[] = [
  {
    "Account ID": "",
    "Sponsor ID": "1",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Paul",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "4500",
    "Pledge Balance": "",
    "Last Name": "Sinclair (AC)",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "2",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Doug",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Wind",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "3",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Dr. Samuel",
    "Specific Student": "",
    "Field of Study or Student Type": "Medical",
    "Gender": "",
    "Pledge Amount": "13000",
    "Pledge Balance": "",
    "Last Name": "González",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "55",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Anon",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "RF 2",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "4",
    "CONDITIONS": "To be confirmed",
    "Donation ID": "",
    "First Name": "Hope Haywood",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Boland",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": false
  },
  {
    "Account ID": "",
    "Sponsor ID": "6",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Rocky",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Daniels 1",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "47",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Lauren",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Orsonio",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "56",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Anon",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "RF 3",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "7",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Ed Tuder & Gary",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Belkin",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "9",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Rocky",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Daniels 2",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "10",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Chip",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Swab 1",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "11",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Chip",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Swab 2",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "12",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Joyce and Gene",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Root",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "58",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Terry",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "9000",
    "Pledge Balance": "",
    "Last Name": "McEachern",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "13",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Bajio Go/ Luis Antonio",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Mondragon",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "14",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Bonnie Jean Benson",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Estate 1",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "14",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Bonnie Jean Benson",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Estate 2",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "16",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Phyllis",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Culp",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "17",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Kate",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "4000",
    "Pledge Balance": "",
    "Last Name": "Greenaway",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "48",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Community",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "7500",
    "Pledge Balance": "",
    "Last Name": "Church 1",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "49",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Community",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "7500",
    "Pledge Balance": "",
    "Last Name": "Church 2",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "18",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Joy",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "Levine",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "50",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Community",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "7500",
    "Pledge Balance": "",
    "Last Name": "Church 3",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "19",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Nancy",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "White 1",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "20",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Janice",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "8000",
    "Pledge Balance": "",
    "Last Name": "McDonald 2",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "20",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Janice",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "8000",
    "Pledge Balance": "",
    "Last Name": "McDonald 1",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "51",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Ron",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Devillier",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "52",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Ben and",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "PETA",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "57",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Anon",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "RF 4",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "21",
    "CONDITIONS": "Prospect",
    "Donation ID": "",
    "First Name": "Terry",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "",
    "Pledge Balance": "",
    "Last Name": "McEachern",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": false
  },
  {
    "Account ID": "",
    "Sponsor ID": "53",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Fashion",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Bugambilia",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "23",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Gustavo",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Martinez Fund 2024",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "25",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Carol Jackson/Casa",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Manx 1",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "26",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Carol Jackson/Casa",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "9000",
    "Pledge Balance": "",
    "Last Name": "Manx 2",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "27",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Barry Chersky & Michael",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "Baiad",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "28",
    "CONDITIONS": "Prospect",
    "Donation ID": "",
    "First Name": "Dr. LW",
    "Specific Student": "",
    "Field of Study or Student Type": "Medical",
    "Gender": "",
    "Pledge Amount": "",
    "Pledge Balance": "",
    "Last Name": "McAnally",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": false
  },
  {
    "Account ID": "",
    "Sponsor ID": "31",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Susie",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "Davidson (see not regarding sharing)",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "59",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "John and Sharon",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "Garside",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "54",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Anon",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "RF 1",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "35",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Judith",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "9000",
    "Pledge Balance": "",
    "Last Name": "Chaikin (Flex)",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "36",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Bordello",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "9000",
    "Pledge Balance": "",
    "Last Name": "Bridge (Carryover)",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "37",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Bordello",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Bridge 1",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "37",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Bordello",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "10000",
    "Pledge Balance": "",
    "Last Name": "Bridge 2",
    "Campaign Name": "",
    "Currency": "MEX",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "38",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Lisa",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "9000",
    "Pledge Balance": "",
    "Last Name": "Goodman",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "39",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Janice",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "4500",
    "Pledge Balance": "",
    "Last Name": "Lingley",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "40",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Match",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "Funds 1 2024",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "41",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Match",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "Funds 2 2024",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "42",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Match",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "Funds 3 2024",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "43",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Match",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "5000",
    "Pledge Balance": "",
    "Last Name": "Funds 4 2024",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "44",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "JA",
    "Specific Student": "",
    "Field of Study or Student Type": "Pool",
    "Gender": "",
    "Pledge Amount": "8446",
    "Pledge Balance": "",
    "Last Name": "POOL",
    "Campaign Name": "",
    "Currency": "USD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "45",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Betty Ann Taylor +Cynthia & Rod",
    "Specific Student": "",
    "Field of Study or Student Type": "Finish Line",
    "Gender": "",
    "Pledge Amount": "4000",
    "Pledge Balance": "",
    "Last Name": "Young",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  },
  {
    "Account ID": "",
    "Sponsor ID": "62",
    "CONDITIONS": "Confirmed",
    "Donation ID": "",
    "First Name": "Paul",
    "Specific Student": "",
    "Field of Study or Student Type": "Flagship",
    "Gender": "",
    "Pledge Amount": "11000",
    "Pledge Balance": "",
    "Last Name": "Sinclair 2",
    "Campaign Name": "",
    "Currency": "CAD",
    "Carryover": "",
    "active": true
  }
]//[];

  students: StudentsAssign[] = [
  {
    "studentId": "FOJM041205MGTLRRA1",
    "studentName": "Mariela Flores Jaramillo",
    "gender": "Female",
    "major": "Veterinario y Zootecnista",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "GAMP011121MGTRJLA8",
    "studentName": "Paola García Mejía",
    "gender": "Female",
    "major": "Ing. en Agricultura Sostenible",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "SAVJ040102HGTNLSA6",
    "studentName": "Josué Abraham Sánchez Villanueva",
    "gender": "Male",
    "major": "Administración de Recursos Turísticos",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 6,
    "active": true
  },
  {
    "studentId": "RARN060107MGTMDDA2",
    "studentName": "Nadia Viridiana Ramírez Rodriguez",
    "gender": "Female",
    "major": "Terapia Física",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "LOML061001HGTPXNA8",
    "studentName": "Leonardo López Múñiz",
    "gender": "Male",
    "major": "Agronomía",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "VASV060828MQTLLLA5",
    "studentName": "Valeria Abigail Valerio Salvador",
    "gender": "Female",
    "major": "Educación",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "SEGV040512MGTRXLA2",
    "studentName": "Valeria Servin Guìa",
    "gender": "Female",
    "major": "Medicina General",
    "photoUrl": "",
    "gradYear": 2030,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "GOPS050420MGTNLRA6",
    "studentName": "Saira Jimena González Palomares",
    "gender": "Female",
    "major": "Comercio Internacional",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "CATB011213MDFMRRA2",
    "studentName": "Brenda Camacho Trejo",
    "gender": "Female",
    "major": "Odontología",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "ZAJQ040903MGTPMTA9",
    "studentName": "Quétzal Zapata Jímenez",
    "gender": "Female",
    "major": "Arquitectura",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 4,
    "active": true
  },
  {
    "studentId": "GARL060514HGTRDSA3",
    "studentName": "Luis Armando García Rodriguez",
    "gender": "Male",
    "major": "Gastronomía",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "RXBE051111MGTJRLA7",
    "studentName": "Elizabeth Rojas Barcenas",
    "gender": "Female",
    "major": "Enfermeria y Obstetricia",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "LOTA040118HGTPRXA0",
    "studentName": "Axel Gael López Trejo",
    "gender": "Male",
    "major": "Tecnologías de la Información e Innovación Digital",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "MEBM050317HGTNRSA7",
    "studentName": "Moisés Emmanuel Méndez Barrientos",
    "gender": "Male",
    "major": "Derecho",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "MEAC050819HGTNGRA1",
    "studentName": "José Carlos Méndez Aguado",
    "gender": "Male",
    "major": "Medicina Odontológica",
    "photoUrl": "",
    "gradYear": 2030,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "LOMM040811MGTPNRA2",
    "studentName": "Mariana Estefanía López Manzano",
    "gender": "Female",
    "major": "Químico Farmacéutico Biólogo",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "HEHC010730HQTRRSA0",
    "studentName": "César Adrián Hernández Hernández",
    "gender": "Male",
    "major": "Música",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "DEEA060423MGTLSNA7",
    "studentName": "Ana Paola Delgado Espinosa",
    "gender": "Female",
    "major": "Gestión Empresarial",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "TAGE060201HGTPRDA6",
    "studentName": "Eduardo Tapia Granados",
    "gender": "Male",
    "major": "Ingeniería Civil",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "VEMC050723HGTNXRA2",
    "studentName": "Carlos Daniel Ventura Múñoz",
    "gender": "Male",
    "major": "Gestión Empresarial",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "HEMD060712MGTRSRA8",
    "studentName": "Dariana Ximena Hernández Músico",
    "gender": "Female",
    "major": "Psicología Clínica",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "BAMC040919MGTRXRA0",
    "studentName": "Cruz Paulina Bárcenas Muñoz",
    "gender": "Female",
    "major": "Veterinario y Zootecnista",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "MARA080105HGTTNLA5",
    "studentName": "Alonso Matehuala Rángel",
    "gender": "Male",
    "major": "Nanotecnología",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "GOCA051023MGTNHGA2",
    "studentName": "Agustina González Chacón",
    "gender": "Female",
    "major": "Geografía Ambiental",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "RAMI020927MGTMDTA6",
    "studentName": "Itzel Ramirez Medina",
    "gender": "Female",
    "major": "Ciencia y Analítica de Dato",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "BATE050422MGTCRSA8",
    "studentName": "Estrella Marisol Baca Trejo",
    "gender": "Female",
    "major": "Mercadotecnía",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "RAGP060707MNENRRA0",
    "studentName": "Perla Jeannette Rangel Guerrero",
    "gender": "Female",
    "major": "Comercio Internacional",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "HUVS061125MGTRNRA0",
    "studentName": "Sara Vianney Huerta Venegas",
    "gender": "Female",
    "major": "Derecho",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "HEGK040605HGTRRVA1",
    "studentName": "Kevin Sealtiel Hernández García",
    "gender": "Male",
    "major": "Ciencias Políticas y Administración Pública",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "IAPJ030503MDFSRSA3",
    "studentName": "María José Islas Paredes",
    "gender": "Female",
    "major": "Derecho",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 4,
    "active": true
  },
  {
    "studentId": "MERA020911MGTJSLA2",
    "studentName": "Alma Gabriela Mejía Rosas",
    "gender": "Female",
    "major": "Arquitectura",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 4,
    "active": true
  },
  {
    "studentId": "HUSD001022HGTRNMA2",
    "studentName": "Damián Huerta Santoyo",
    "gender": "Male",
    "major": "Traducción",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "BAAF050820MGTTRRA0",
    "studentName": "Frida Bautista Arevalo",
    "gender": "Female",
    "major": "Comercio Internacional",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "GIVF050812HGTRZRA2",
    "studentName": "Fernando Grimaldi Vázquez",
    "gender": "Male",
    "major": "Ing. Mecánica",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "MEMJ040505HGTNJNA9",
    "studentName": "Juan Manuel Méndez Mejía",
    "gender": "Male",
    "major": "Ing. Agrónica",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "OECL011020MGTLRRA1",
    "studentName": "Laura Olvera Cortés",
    "gender": "Female",
    "major": "Inclusion Educativa",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "AAMK070628HGTLNVA8",
    "studentName": "Kevin Alvarado Méndez",
    "gender": "Male",
    "major": "Ing. Industrial",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "LOCJ050605HGTPSSA3",
    "studentName": "Josue Yael Lopez Castillo",
    "gender": "Male",
    "major": "Ing. Sistemas",
    "photoUrl": "",
    "gradYear": 2027,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "AUAP050209MGTGGLA6",
    "studentName": "Paola Guadalupe Aguado Aguilar",
    "gender": "Female",
    "major": "Médico Cirujano",
    "photoUrl": "",
    "gradYear": 2030,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "GOMJ010131HGTDNNA3",
    "studentName": "Juan Ricardo Daniel Godinez Mendez",
    "gender": "Male",
    "major": "Enfermeria y Obstetricia",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "PUAA061104MGTRRNA9",
    "studentName": "Andrea Camila Puerto Arcila",
    "gender": "Female",
    "major": "Innovación Educativa",
    "photoUrl": "",
    "gradYear": 2028,
    "gradMonthNum": 12,
    "active": true
  },
  {
    "studentId": "RAJL070718HGTMRSA0",
    "studentName": "Luis Eduardo Ramírez Juárez",
    "gender": "Male",
    "major": "Sociología / Ciencia Politicas",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "HEAM070515HGTRRRA1",
    "studentName": "Martín Alejandro Hernández Arteaga",
    "gender": "Male",
    "major": "Derecho",
    "photoUrl": "",
    "gradYear": 2030,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "SARP060902MGTNMLA1",
    "studentName": "Paula Sofia Sánchez Ramírez",
    "gender": "Female",
    "major": "Neurociencias",
    "photoUrl": "",
    "gradYear": 2029,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "RORA070614HMCSMDA6",
    "studentName": "Adrián Damaso Rosas Ramírez",
    "gender": "Male",
    "major": "Ciencias y Analitíca de Datos",
    "photoUrl": "",
    "gradYear": 2030,
    "gradMonthNum": 1,
    "active": true
  },
  {
    "studentId": "SAMT070903MGTLNNA5",
    "studentName": "Tania Elizabeth Salazar Mendoza",
    "gender": "Female",
    "major": "Derecho",
    "photoUrl": "",
    "gradYear": 2030,
    "gradMonthNum": 7,
    "active": true
  },
  {
    "studentId": "GAVE060927HGTRLDA9",
    "studentName": "Edwin Said Garay Villegas",
    "gender": "Male",
    "major": "Médico Cirujano",
    "photoUrl": "",
    "gradYear": 2031,
    "gradMonthNum": 7,
    "active": true
  }
]//[];

  selected_sponsor: FormGroup = this.sponsor_fg({} as SponsorsAssign);
  selected_student: FormGroup = this.student_fg({} as StudentsAssign);
  selected_sponsor_i: number = 0;
  selected_student_i: number = 0;

  ordered_sponsors: SponsorsAssign[] = [];
  ordered_students: StudentsAssign[] = [];

  customFields: { [key: string]: CustomField } = {};
  sort_direction: 'asc' | 'desc' = 'asc';
  ready_to_match: boolean = false;
  constructor(
    private form_builder: FormBuilder,
    private provider: ProviderService,
    private _form: FormService,
    private _master: MasterService,
    private ls: LocalStorageService
  ) {
    this.form.valueChanges.subscribe((data: any) => ls._set('MATCH', data))
  }

  ngOnInit(): void {
    this.get_sponsors();
    this.get_students();
    this.get_custom_fields();
  
    this.form.controls['config'].controls['current_year'].valueChanges.subscribe((data: any) => this.current_year = data)
  }
  async save() {
    const confirm = await this._form.confirm();
    if (!confirm) return this._master.snack('info', 'No changes have been made.');

    const student_fields = [
      { id: "100", name: "Student 1" },
      { id: "102", name: "Student 2" },
      { id: "103", name: "Student 3" },
      { id: "107", name: "Student 4" },
      { id: "108", name: "Student 5" },
      { id: "111", name: "Student 6" }
    ];

    const matchedStudents: StudentsAssign[] = this.matched_array().value;

    for (const match of matchedStudents) {
      for (const balance of match.balance_history ?? []) {
        /* 
        ! CHANGES FOR NEON
        */
        const sponsor_response: any = await this.provider.production('GET', `/neon/accounts/${balance['Account ID']}`);
        const sponsor: Sponsor = sponsor_response.individualAccount;

        const sponsor_years: AccountCustomFields[] = sponsor.accountCustomFields
          ?.find(f => f.id == "110")?.optionValues
          ?.map(({ id, name }) => ({ id, name })) ?? [];

        const new_student = student_fields.find(
          f => /^Student [2-99]$/.test(f.name) &&
            !sponsor.accountCustomFields?.some(s => s.name == f.name)
        );

        const new_years = this.customFields['Student Graduation Date(s)'].optionValues
          .filter(opt => opt.name == match.gradYear.toString())
          .map(({ id, name }) => ({ id, name }));

        const years = await this.delete_duplicates([...sponsor_years, ...new_years], "id");

        const data = {
          individualAccount: {
            accountCustomFields: [
              {
                id: "110",
                name: "Student Graduation Date(s)",
                value: null,
                optionValues: years
              },
              new_student && {
                id: new_student.id,
                name: new_student.name,
                value: `${match.studentName}`
              }
            ].filter(Boolean)
          }
        };
        const response: any = await this.provider.production('PATCH', `/neon/accounts/${balance['Account ID']}`, { body: data });

        /* 
        ! CHANGES FOR PRIVADA
        */

        const privada_response = await this.provider.request('GET', 'Students/match_sponsor_student');


        if (response.accountId)
          this._master.snack('success', `Changes were made for ${match.studentName} and ${balance.sponsor_name}`)
      }
    }

    return true;
  }


  async get_sponsors() {
    /* 
    TODO UNCOMMENT THIS WHEN HAVING CONECTION TO WS
    */
    /* this.sponsors = (<any>await this.provider.production('POST', '/neon/donations/search', {
                body: {
                    "searchFields": this.pledges_search_fields,
                    "outputFields": [
                        "First Name",
                        "Last Name",
                        "Account ID",
                        "Pledge Amount",
                        "Donation ID",
                        "Campaign Name",
                        78,
                        79,
                        80,
                        81,
                        84,
                        124
                        // 85
                    ],
                    "pagination": {
                        "currentPage": 0,
                        "pageSize": 200,
                        "sortColumn": "Last Name",
                        "sortDirection": "DESC",
                        "totalPages": 0,
                        "totalResults": 0
                    }
                }
            })).searchResults;
            console.log(this.sponsors);
            
    this.sponsors = this.sponsors.filter((pledge: SponsorsAssign) => pledge['Campaign Name']?.includes(this.current_year.toString()));
           */  
    const priorityMap: { [key: string]: number } = {
      "Yes": 0,
      "Request only, not Required": 1,
      "No": 2
    };

    console.log(this.sponsors);

    this.ordered_sponsors = this.sponsors;
    this.sponsors.sort((a: SponsorsAssign, b: SponsorsAssign) => {
      const aCond = a.CONDITIONS ?? "No";
      const bCond = b.CONDITIONS ?? "No";

      const priorityDiff = (priorityMap[aCond] ?? 3) - (priorityMap[bCond] ?? 3);

      return priorityDiff;
    });



    await this.sponsors.forEach(async (sponsor: SponsorsAssign) => {
      await this.sponsors_array().push(this.sponsor_fg({...sponsor, active: true}))
    });

    console.log(this.sponsors_array());
    
  }

  async get_students() {
   /*  this.students = await this.provider.request('GET', `api/students/get_current_year_students/${this.current_year}` )
    console.log(this.students);
    
    this.ordered_students = await this.students;
    */
    this.students.forEach(async (student: StudentsAssign) => await this.students_array().push(this.student_fg(student)));

    console.log(this.students_array().value); 
    
  }

  async select_sponsor(sponsor: AbstractControl<SponsorsAssign>) {
    let config = this.form.value.config;

    this.selected_sponsor.patchValue(sponsor.value)

    this.students_array().controls.forEach((student: AbstractControl<StudentsAssign>) => {
      let score = 0;

      if (this.selected_sponsor!.value!.Gender == 'Male' && ['M', 'Male'].includes(student.value.gender))
        score += 1;

      if (this.selected_sponsor!.value!.gender == 'Female' && ['F', 'Female'].includes(student.value.gender))
        score += 1;

      const grad_date = `${student.value.gradMonthNum}-01-${student.value.gradYear}`;
      const duration = this.major_duration(grad_date);
      const sponsor_type = this.selected_sponsor!.value!['Field of Study or Student Type'];
      /*             const student_cost =  (
                      duration * config!.current_monthly_payment! +
                      config!.laptop_cost! +
                      config!.operation_cost! +
                      student.
                  ) / config!.dollar!;
       */
      if (parseFloat(this.selected_sponsor!.value!['Pledge Amount']!) > this.calculate_student_costs(student.value).student_cost) {
        score += 3;
      }

      const durationRules: { [key: string]: [number, number] } = {
        'Medical': [72, Infinity],
        'Flagship': [36, 72],
        'Finish Line': [25, 36],
      };

      const [min, max] = durationRules[sponsor_type] || [Infinity, -Infinity];

      if (duration >= min && duration < max) {
        score += 2;
      }

      student.get('score')?.patchValue(score);
    });

    await this.order_students_by_score();
  }

  async select_student(student: AbstractControl<StudentsAssign>) {
    if (!student.value.titulo || student.value.titulo == 0) {
      await this._master.snack('error', 'Please, add an amount for título');
      (student as FormGroup).controls['titulo'].markAsTouched()
    }
    else
      this.selected_student.patchValue(student.value)
  }

  async match_sponsor_student() {
    const amount_to_cover: number = Math.min(this.selected_sponsor.value["Pledge Balance"], this.selected_student.value.student_balance);
    const sponsor_amount = this.selected_sponsor.value["Pledge Balance"] - amount_to_cover;
    const student_amount = this.selected_student.value["student_balance"] - amount_to_cover;

    this.selected_sponsor.controls["Pledge Balance"].patchValue(sponsor_amount);
    this.selected_student.controls["student_balance"].patchValue(student_amount);

    if (this.selected_sponsor.value["Pledge Balance"] == 0)
      this.selected_sponsor.controls["active"].patchValue(false);

    console.log(this.selected_student.value["student_balance"], this.selected_student.value);
    
    if (this.selected_student.value["student_balance"] == 0)
      this.selected_student.controls["active"].patchValue(false);

    const new_balance_history = this.form_builder.group({
      "Account ID": [this.selected_sponsor.value['Account ID']],
      "Sponsor ID": [this.selected_sponsor.value['Sponsor ID']],
      "sponsor_name": [`${this.selected_sponsor.value["First Name"]} ${this.selected_sponsor.value["Last Name"]}`],
      "balance_received": [amount_to_cover]
    })

    this.sponsors_array().at(this.selected_sponsor_i).patchValue(this.selected_sponsor.value);
    this.students_array().at(this.selected_student_i).patchValue(this.selected_student.value);

    const student_index: number = this.matched_array().value.findIndex((student: StudentsAssign) => student.studentId == this.selected_student.value.studentId);

    if (student_index != -1) {
      this.matched_array().at(student_index).patchValue(await this.selected_student.getRawValue());
      (this.matched_array().at(student_index).get('balance_history') as FormArray).push(new_balance_history);
    } else {
      this.balance_history_array().push(new_balance_history);
      this.matched_array().push(this.student_fg(await this.selected_student.getRawValue(), true));
    }

    while (this.balance_history_array().length > 0)
      this.balance_history_array().removeAt(0)

    this.selected_sponsor.reset();
    this.selected_student.reset();

  }

  async unmatch_sponsor_student(match_i: number, balance_history_i: number) {
    const match: FormGroup = this.matched_array().at(match_i) as FormGroup;
    const balance_history: FormArray = match.controls["balance_history"] as FormArray;
    const balance: FormArray = balance_history.at(balance_history_i) as FormArray;
    const amount: number = balance.value["balance_received"];

    const sponsor_index = this.sponsors_array().value.findIndex((sponsor: SponsorsAssign) => sponsor['Account ID'] == balance.value["Account ID"]);
    const sponsor: FormGroup = this.sponsors_array().at(sponsor_index) as FormGroup;
    sponsor.controls["active"].patchValue(true);

    const new_sponsor_balance = sponsor.value["Pledge Balance"] + amount;
    sponsor.controls["Pledge Balance"].patchValue(new_sponsor_balance);

    const student_index = this.students_array().value.findIndex((student: StudentsAssign) => student['studentId'] == match.value["studentId"]);
    const student: FormGroup = this.students_array().at(student_index) as FormGroup;
    student.controls["active"].patchValue(true);

    const new_student_balance = student.value["student_balance"] + amount;
    student.controls["student_balance"].patchValue(new_student_balance);

    if (balance_history.value.length > 1)
      balance_history.removeAt(balance_history_i);
    else
      this.matched_array().removeAt(match_i);
  }

  async get_custom_fields() {
    this.customFields['CONDITIONS'] = await this.provider.production('GET', '/neon/customFields/' + 78);
    this.customFields['Field of Study or Student Type'] = await this.provider.production('GET', '/neon/customFields/' + 80);
    this.customFields['Student Graduation Date(s)'] = await this.provider.production('GET', '/neon/customFields/' + 110);
    this.customFields['Student 1'] = await this.provider.production('GET', '/neon/customFields/' + 100);
    this.customFields['Student 2'] = await this.provider.production('GET', '/neon/customFields/' + 102);
    this.customFields['Student 3'] = await this.provider.production('GET', '/neon/customFields/' + 103);
    this.customFields['Student 4'] = await this.provider.production('GET', '/neon/customFields/' + 107);
    this.customFields['Student 5'] = await this.provider.production('GET', '/neon/customFields/' + 108);
    this.customFields['Student 6'] = await this.provider.production('GET', '/neon/customFields/' + 111);
    console.log(this.customFields);

  }

  async order_students_by_score() {
    this.ordered_students = (await this.students_array().value.sort((a: StudentsAssign, b: StudentsAssign) => {
      if (b.score !== a.score) {
        return b.score! - a.score!;
      }

      return a.student_balance! - b.student_balance!;
    }));
  }

  sponsor_is_selected(id: string) {
    return this.selected_sponsor.value["Account ID"] == id ? ' border-[#1c94a4] ' : ' border-white '
  }

  student_is_selected(id: string) {
    return this.selected_student.value["studentId"] == id ? ' border-[#1c94a4] ' : ' border-white '
  }

  color(balance: number, total: number): string {
    const porcentaje = (balance / total) * 100
    const c = { r: 235, g: 64, b: 52 }
    if (porcentaje == 0)
      return `rgb(${c.r}, ${c.g}, ${c.b})`
    else if (porcentaje < 66)
      return `rgb(${c.r}, ${((255 - c.g) * (porcentaje / 100)) + c.g}, ${c.b})`
    else (porcentaje >= 66)
    return `rgb(${(c.r - (c.r * (porcentaje / 100)))}, ${(((255 - c.g) * (porcentaje / 100)) + c.g) - 50}, ${c.b})`
  }

  ordered_index(studentId: string) {
    return this.ordered_students.findIndex((student: StudentsAssign) => student.studentId == studentId)
  }

  major_duration(end_date: string) {
    let end = new Date(end_date);

    const startYear = this.current_year ?? 0;
    const startMonth = 7;

    const endYear = end.getFullYear();
    const endMonth = end.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }

  months_years(student: StudentsAssign) {
  if (!student.gradYear || !student.gradMonthNum) {
    return { years: 0, months: 0 };
  }
  
  let total_months = this.major_duration(`${student.gradMonthNum}-01-${student.gradYear}`);
  const years = Math.floor(total_months / 12);
  const months = (total_months % 12) + 1;
  return { years, months };
}
  month_from(mesesRestantes) {
  const meses = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  const indiceInicio = meses.findIndex(
    mes => mes.toLowerCase() === "Aug".toLowerCase()
  );

  if (indiceInicio === -1) 
    throw new Error("Mes de inicio no válido");

  const indiceFinal = (indiceInicio + mesesRestantes) % 12;

  return meses[indiceFinal];
}


  sponsors_array(): FormArray {
    return <FormArray>this.form.controls['sponsors']
  }

  students_array(): FormArray {
    return <FormArray>this.form.controls['students']
  }

  matched_array(): FormArray {
    return <FormArray>this.form.controls['matched']
  }

  balance_history_array(): FormArray {
    return <FormArray>this.selected_student.controls['balance_history']
  }

  async update_student_costs() {
  for (const student of this.students_array().controls) {
    const { operation_cost, student_cost } = this.calculate_student_costs(student.value);  
    student.get('operation_cost').patchValue(operation_cost);

    if (student.get('student_balance')?.value === student.get('student_cost')?.value) {
      student.get('student_balance')?.patchValue(0);
      student.get('student_cost')?.patchValue(0);
      student.get('student_balance')?.patchValue(student_cost, { emitEvent: false });
    }

    student.get('student_cost')?.patchValue(student_cost, { emitEvent: false });
  }
}



  calculate_student_costs(student: StudentsAssign) {
  const config = this.form.value.config;
  let months = this.major_duration(`${student.gradMonthNum}-01-${student.gradYear}`);
    
  months = (months % 12 == 0 ? months : months + 1);
  const subtotal = (months * config!.current_monthly_payment!) + config!.laptop_cost! + Number(student?.titulo! ?? 0);
  const operation_cost = subtotal * 0.2;
  const student_cost = (subtotal + operation_cost) / config!.dollar!;
  
  return { subtotal, operation_cost, student_cost };
}


  student_fg(student: StudentsAssign, new_balance?: boolean): FormGroup {
    const config = this.form.value.config;
    const months = this.major_duration(`${student.gradMonthNum}-01-${student.gradYear}`) + 1;
    const subtotal = (months * config!.current_monthly_payment!) + config!.laptop_cost! + Number(student?.titulo! ?? 0);
    const operation_cost = subtotal * 0.2;
    const student_cost_value = (subtotal + operation_cost) / config!.dollar!;
    student.titulo = 6000;
    return this.form_builder.group({
      studentId: [student.studentId, Validators.required],
      studentName: [student.studentName, Validators.required],
      gender: [student.gender, Validators.required],
      major: [student.major, Validators.required],
      gradYear: [student.gradYear, Validators.required],
      gradMonthNum: [student.gradMonthNum, Validators.required],
      photoUrl: [student.photoUrl, Validators.required],

      field: [null, Validators.required],
      laptop_cost: [this.form.value.config!.laptop_cost, [Validators.required, Validators.min(0)]],
      student_cost: [student_cost_value, [Validators.required, Validators.min(1)]],
      operation_cost: [operation_cost, Validators.required],
      student_balance: [new_balance ? student.student_balance : student_cost_value, [Validators.required, Validators.min(0)]],
      neon_account_id: [null, Validators.required],
      sponsor_id: [null, Validators.required],
      titulo: [student.titulo ?? null, [Validators.required, Validators.min(0)]],
      score: [null, Validators.required],
      order: [null, Validators.required],
      balance_history: this.form_builder.array(student['balance_history'] ?? []),
      active: [student.active ?? true]
    });
}

  sponsor_fg(sponsor: SponsorsAssign, new_balance?: boolean): FormGroup {
    sponsor["Pledge Amount"] = (sponsor["Currency"] == "MXN" ? parseFloat(sponsor["Pledge Amount"]) / this.form.value.config?.pledge_exchange_rate! : parseFloat(sponsor["Pledge Amount"])).toString()
    return this.form_builder.group({
      "Account ID": [sponsor["Account ID"]],
      "Sponsor ID": "",
      "CONDITIONS": [sponsor["CONDITIONS"]],
      "Donation ID": [sponsor["Donation ID"]],
      "First Name": [sponsor["First Name"]],
      "Last Name": [sponsor["Last Name"]],
      "Specific Student": [sponsor["Specific Student"]],
      "Field of Study or Student Type": [sponsor["Field of Study or Student Type"]],
      "Gender": [sponsor["Gender"]],
      "Pledge Amount": [parseFloat(sponsor["Pledge Amount"])],
      "Pledge Balance": [new_balance ? sponsor["Pledge Balance"] : parseFloat(sponsor["Pledge Amount"])],
      "Campaign Name": [sponsor["Campaign Name"]],
      "active": [sponsor.active]
    })
  }

  aplphabetize_order() {
    this.sort_direction = this.sort_direction == 'asc' ? 'desc' : 'asc';
  }

  alphabetize() {
    this.sort_direction = this.sort_direction == 'asc' ? 'desc' : 'asc';

    this.ordered_sponsors = this.sponsors_array().value.slice().sort((a: SponsorsAssign, b: SponsorsAssign) => {
      const nameA = (a?.['Last Name'] || '').toLowerCase();
      const nameB = (b?.['Last Name'] || '').toLowerCase();

      if (nameA < nameB) return this.sort_direction == 'asc' ? -1 : 1;
      if (nameA > nameB) return this.sort_direction == 'asc' ? 1 : -1;
      return 0;
    });
    console.log(this.ordered_sponsors);

  }

  get_sponsor_order(id: string, sponsor_balance: number) {
    if ((<StudentsAssign[]>this.students_array().value).filter((student: StudentsAssign) => student.active == true).every((student: StudentsAssign) => student.student_balance > sponsor_balance))
      return 99;

    return this.ordered_sponsors.findIndex((sponsor: SponsorsAssign) => sponsor['Account ID'] == id)
  }

  hide_object(data: any, query: string, field?: string) {
    if (query == 'any')
      return ' ';

    if (field)
      return (this.normalize(query) == this.normalize(data[field]) ? ' ' : ' hidden ')

    return (Object.values(data)
      .filter((value: any) => typeof value == 'string')
      .some((value: any) => this.normalize_reg(query).test(value)) ? ' ' : ' hidden ');
  }

  normalize(query: string) {
    return query
      ?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      ?.toLowerCase()
  }

  normalize_reg(query: string) {
    return new RegExp(
      query
        ?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        ?.toLowerCase()
        ?.split('')
        ?.join('.*?'),
      'i'
    );
  }

  async delete_duplicates(array: any[], param: string): Promise<any[]> {
    return Array.from(
      new Map(array.map(el => [el[param], el])).values()
    );
  }

  @HostListener('window:resize')
  hola() { }
}
