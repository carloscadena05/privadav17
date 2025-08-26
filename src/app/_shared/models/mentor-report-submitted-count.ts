export class MentorReportSubmittedCount {
  constructor(
    public mentorName: string,
    public mentorGUId: string,
    public studentGuid: string,
    public studentName: string,
    public mentorAssignedDate: Date,
    public submittedCount: number,
    public latestDate: Date,
    public mentoringComment: string,
    public major: string,
    public universityAbbrev: string,
    public photoUrl: string,
    public mentorphotoUrl: string
  ) {}
}
