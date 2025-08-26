export class Student {
  constructor(
    public studentId?: number,
    // // public lastNames?: string,
    // // public firstNames?: string,
    // // public nickName?: string, // NickName
    // [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    // public FullName // FullName
    public curp?: string, // CURP
    public rfc?: string, // RFC
    public bankAccount?: string, // BankAccount
    public gender?: string, // Gender

    // // public cellPhone?: string, // CellPhone
    // // public homePhone?: string, // HomePhone
    // // public otherPhone?: string, // OtherPhone
    // // public email?: string, // Email
    // public memberRecordGUId?: string,
    // public englishLevel?: string, // EnglishLevel
    // public sponsor?: string, // Sponsor
    public prepaId?: number, // PrepaID
    public major?: string, // Major

    // public ageWhenJoined?: string, // AgeWhenJoined
    public yearJoinedJa?: string, // YearJoinedJA
    public universityId?: string, // UniversityID
    public gradMonth?: string, // GradMonth
    public gradYear?: string, // GradYear
    // public dob?: Date, // DOB
    // // public addresss?: string, // Addresss
    // // public colonia?: string, // Colonia
    // public initialInterview?: string, // InitialInterview
    public sponsorGroupId?: string,
    public mastersSponsorGroupID?: number,
    public statusId?: number, // StatusID
    // public englishSkillLevelId?: number, // EnglishSkillLevelID
    public photoUrl?: string, // PhotoURL
    public updateDtTm?: Date, // UpdateDtTm
    // public byte[] Timestamp?: string, // Timestamp
    public emergencyContactName?: string, // EmergencyContactName
    public emergencyContactPhone?: string, // EmergencyContactPhone
    public joinedFromId?: number, // JoinedFromID
    public studentHistory_Es?: string, // StudentStory
    public gradMonthNum?: number, // GradMonth
    public studentGUId?: string,
    public mentorGUId?: string,
    public mentorAssignedDate?: Date,
    public mentoringEndDate?: Date,
    public mentoringComment?: string,
    public credentialYear?: number,
    public credentialMonthNum?: number,
    public probationStartDate?: Date,
    public probationEndDate?: Date,
    // [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    // public activeStatus?: number,
    // public pilotProxyId?: number,
    public educationalLevelId?: number,
    public studentHistory_En?: string,

    public tituloIssuedDate?: Date,
    public tituloUploadedDate?: Date,

    public cedula?: string,
    public mastersUniversityId?:number,
    public mastersFieldOfStudy?: string,
    public mastersGradYear?: string,
    public mastersGradMonthNum?: number,
    public mastersStartYear?: string,
    public mastersStartMonthNum?: number,
    public undergradStartYear?: string,
    public undergradStartMonthNum?: number,
    public pcsId?: number,
  ) {}
}
