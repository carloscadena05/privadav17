export class StudentSelfReport {
  constructor(
    public studentSelfReportId?: number,
    public studentName?: string,
    public sponsorGroupId?: number,
    public reportDateTime?: Date,
    public reportYear?: number,
    public reportPeriod?: number,
    public narrative_English?: string,
    public narrative_Spanish?: string,
    public reviewedStatusId?: number,
    public reviewedStatus?: string,
    public sponsorGroupName?: string,
    public studentGUId?: string,
    public photoUrl?: string
  ) {}
}
