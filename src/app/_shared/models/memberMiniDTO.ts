export class MemberMiniDTO {

  constructor(
    public memberId: number,
    public memberGUId: string,
    public memberName: string,
    public email: string,
    public neonID?: number
  ) { }
}
