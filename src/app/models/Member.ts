export class Member {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  teamId: string;
  teamName: string | undefined;
  startDate: string;
  officeId: string;
  officeName: string | undefined;
 
  constructor(
    id: string,
    name: string,
    email: string,
    image: string,
    createdAt: string,
    teamId: string,
    teamName: string | undefined,
    startDate: string,
    officeId: string,
    officeName: string | undefined
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
    this.createdAt = createdAt;
    this.teamId = teamId;
    this.teamName = teamName;
    this.startDate = startDate;
    this.officeId = officeId;
    this.officeName = officeName;
  }
}