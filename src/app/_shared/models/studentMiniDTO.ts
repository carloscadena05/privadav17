export class StudentMiniDTO {

  constructor(
    public studentId: number, // StudentID (Primary key)
    public studentGUId?: string,
    public studentName?: string, // StudentName
    public statusId?: number, // StatusID
    public email?: string,
    public photoUrl?: string
  ) { }
}
