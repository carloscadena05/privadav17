import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDonationsComponent } from './export-donations.component';

describe('ExportDonationsComponent', () => {
  let component: ExportDonationsComponent;
  let fixture: ComponentFixture<ExportDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportDonationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
