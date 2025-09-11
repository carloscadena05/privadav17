export class Inscription {
  constructor(
    public inscriptionId: number,
    public studentGUId: string,
    public academicTermId: number,
    public inscriptionsEntryStartDate: Date = new Date(),
    public inscriptionsEntryEndDate: Date = new Date(),
    public year?: number, // temp holdover

    public registrationFormSubmittedDate?: Date,
    public paymentReceiptSubmittedDate?: Date,
    public confirmedDate?: Date,
    public confirmedById?: number,

  ) {}
}
