export class StudentSponsorXRef {
  constructor(
    public studentGUId: string,
    public studentName: string,
    public studentStatusId: number,
    public studentStatus: string,
    public sponsorId: number | null,
    public sponsorName: string,
    public sponsorStatusId: number,
    public sponsorStatus: string,
    public sponsorGroupId: number | null,
    public sponsorGroupName: string,
    public photoURL: string,
    public studentMastersUniversityID?: number
  ) {}
}
