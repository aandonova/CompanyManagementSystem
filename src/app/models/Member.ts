export class Member {
  id: number;
  name: string | undefined;
  email: string | undefined;
  image: null;
  createdAt: number;
  team_id:number;
  // team_name: string ;
  startDate: number;
  officeId: number;
  // officeName: string ;

  constructor() {
    this.id = 0;
    this.createdAt = 0;
    this.team_id = 0;
    this.startDate = 0;
    this.officeId = 0;
  }
}


