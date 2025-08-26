export class MemberWithAnyRelatedStudent {

  constructor(
    public memberGUId?: string,
    public lastNames?: string,
    public firstNames?: string,
    public email?: string,
    public photoUrl?: string,

    public memberType?: string,
    public memberStatusId?: number,
    public memberStatus?: string,

    public relatedStudentId?: number,
    public relatedStudentName?: string,
    public relatedStudentStatusId?: number,
    public relatedStudentStatus?: string,
    public relatedStudentGUId?: string,
    public studentphotoUrl ?: string,

  ) { }
}
