export class FollowUpRequestDTO {
  constructor(
    public followUpRequestId: number,
    public requesterId: number | null,
    public requestStatusId?: number | null,
    public requestSubStatusId?: number | null,
    public assignedToId?: number | null,
    public latestUpdaterId?: number | null,
    public subject_English?: string,
    public subject_Spanish?: string,
    public updateHistory_English?: string,
    public updateHistory_Spanish?: string,
    public createDateTime?: Date | string | null,
    public lastUpdateDateTime?: Date | string | null,
    public studentGUId?: string,
    public requestStatus?: string,
    public requestSubStatus?: string,
    public studentName?: string,
    public requesterName?: string,
    public requesterEmail?: string,
    public updaterName?: string,
    public assignedToName?: string,
    public photoUrl?: string,
    public major?: string,
    public universityAbbrev?: string,
    public yearJoinedJA?: string

  ) {}
}
