export class StudentFlexiDTO {
  constructor(

    public studentId: number, // StudentID (Primary key)
    public studentName: string, // StudentName
    public photoUrl?: string,
    // public email: string, // Email
    //public memberRecordGUId: string,
    // public gender: string, // Gender
    public joinedFrom?: string,

    public status?: string, // Status
    public esStatus?: string, // Status
    public activeStatus?: number,

    public educationalLevel?: string,

    public startYear?: number,
    public startMonth?: string,

    public gradYear?: number, // GradYear
    public gradMonth?: string, // GradMonth
    public mentorName?: number, // MentorName

    public studentGUId?: string,
    public mentorGUId?: string ,//
    public studentSnapshotStatus?: number,

    public sponsorGroupName?: string,

   public universityAbbrev?: string,
   public universityDescriptor?: string,
   public universityName?: string,
   public major?: string,



    public gradeRptStatus?: string, // GradeRptStatus
    public gpaStatus?: string, // GPAStatus
    public timelySSRStatus?: string,


    // public numericGradeRptStatus?: number,
    // public numericGPAStatus?: number,
    public timelyMentorMeetingStatus?: string,
    public timelyMentorReportStatus?: string,
    public pcsId?: number,
    public mentorPhotoUrl?: string,
    // public numericTimelyMentorMeetingStatus?: number,
    // public numericTimelyMentorReportStatus?: number,

    /***
    // public mentorId?: number, // MentorID


    public sponsorGroupId?: string,

    public tituloIssuedDate?: Date,
    public tituloUploadedDate?: Date,
    public cedula?: string,

    public mastersUniversityId?:number,
    public mastersFieldOfStudy?: string,


    // public joinedFromId?: number,
    // public joinedFrom?: string,

    public mentorAssignedDate?: Date,
    public mentoringEndDate?: Date,
    public mentoringComment?: string,

    // public credentialYear?: number,
    // public credentialMonthNum?: number,
    // public credentialMonth?: string,


    // public probationStartDate?: Date,
    // public probationEndDate?: Date,
    // public pilotProgram?: string,

    public currentacademicTermId?: number,
    public entryStartDate?: Date,
    public gradeEntryActiveStatus?: number,
    // public mastersStartYear?: string,
    // public mastersStartMonthNum?: number,
    // public undergradStartYear?: string,
    // public undergradStartMonthNum?: number
 */
  ) {}
}
