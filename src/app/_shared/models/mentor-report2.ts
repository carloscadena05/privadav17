export class MentorReport2RPT {

  constructor(
    public mentorReportId?: number,
    public mentorId?: number,
    public studentId?: number,
    public mentorName?: string,
    public studentName?: string,
    public reportDateTime?: Date,
    public lastContactYear?: number,
    public lastContactMonth?: number,
    public emoji?: number,
    public communication?: number,
    public narrative_English?: string,
    public narrative_Spanish?: string,
    public reviewedStatusId?: number,
    public reviewedStatus?: string,
    public sponsorGroupName?: string,
    public originalLanguageId?: number,
    public sponsorRequiredLanguageId?: number,
    public sponsorPreferredLanguageId?: number,
    public studentGUId?: string,
    public mentorGUId?: string,
    public photoUrl?: string,
    public mentorphotoUrl?: string,
    public Major?: string,
    public UniversityAbbrev?: string
  ) {

  }
}
