import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorStudentMatchComponent } from './sponsor-student-match.component';

describe('SponsorStudentMatchComponent', () => {
  let component: SponsorStudentMatchComponent;
  let fixture: ComponentFixture<SponsorStudentMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorStudentMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsorStudentMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
