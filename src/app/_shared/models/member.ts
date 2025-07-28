export class Member {
  constructor(
    public memberId?: number,
    public lastNames?: string,
    public firstNames?: string,
    public email?: string,

    public smA_Phone?: string,
    public nonSMA_Phone?: string,

    public smA_Address?: string,
    public smA_postalCode?: string,

    public nonSMA_Address?: string,
    public nonSMA_City?: string,
    public nonSMA_StateProvince?: string,
    public nonSMA_PostalCode?: string,
    public mentorStatusId?: number,
    public sponsorStatusId?: number,
    public adminStatusId?: number,
    public employeeStatusId?: number,
    public donorStatusId?: number,
    public volunteerStatusId?: number,
    public presidentStatusId?: number,
    public boardMemberStatusId?: number,

    public yearJoinedJa?: number,
    public monthsinSma?: string,
    public nonSMA_CountryId?: number,
    public bestWayToContactId?: number,
    public countryOfResidenceId?: number,

    public spanishSkillLevelId?: number,
    public englishSkillLevelId?: number,
    public preferredLanguageId?: number,
    // public studentPreferenceId?: number,

    public lastLoginDateTime?: Date,
    public numberOfLogins?: number,

    public careerBackground?: string,
    public otherRelevantExperience?: string,
    public comments?: string,
    public personGUId?: string,
    public photoUrl?: string,

    public studentRecordGUId?: string,
    public memberGUId?: string,
    public lastMentorMeeting?: Date,
    public nickName?: string,

    public coloniaID?: number,
    public cellPhone?: string,
    public colonia?: string,
    public neonID?: number
  ) {}
}
