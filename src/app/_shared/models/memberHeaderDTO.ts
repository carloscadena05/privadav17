export class MemberHeaderDTO {

  constructor(
    public memberId: number,
    public memberGUId?: string,
    public memberName?: string,
    public email?: string,
    public yearJoinedJa?: number, // YearJoinedJA
    public photoUrl?: string,
    public adminStatusId?: number,
    public mentorStatusId?: number,
    public sponsorStatusId?: number,
    public studentId?: number,
    public studentRecordGUId?: string,
    public neonID?: number

  ) { }
}
