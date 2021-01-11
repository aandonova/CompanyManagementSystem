import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../models/Member';
import { Team } from '../models/Team';
import { Office } from '../models/Office';
import { ApiConfig } from '../api-config';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  public members: Member[] = [];
  public gridMembers: Member[] = [];
  public teams: Team [] = [];
  public offices: Office [] = [];
  public selectedOffice: string = "all";
  public selectedTeam: string = "all";
  public leadMemberStatusCount: number = 0;
  public dropInMemberStatusCount: number = 0;
  public activeMemberStatusCount: number = 0;
  public formerMemberStatusCount: number = 0;
  public allMemberStatusCount: number = 0;

  closeResult = '';
 
  constructor(
    private http: HttpClient, 
    private modalService: NgbModal) {
  }
 
  ngOnInit(): void {
    var baseApiUrl = ApiConfig.getBaseUrl();
    var headers = ApiConfig.getDefaultHeaders();
    this.http.get(`${baseApiUrl}/teams/`, {headers}).subscribe(res => {
      var response = res as any[];
      this.teams = response.map((team: { _id: number; name: string; }) => {
        return new Team(team._id, team.name);
      });
      console.log(this.teams);
    });
    this.http.get(`${baseApiUrl}/offices/`, {headers}).subscribe(res => {
      var response = res as any[];
      this.offices = response.map((office: { _id: string; name: string; }) => {
        return new Office(office._id, office.name);
      });
      console.log(this.offices);
    });
 
    this.http.get(`${baseApiUrl}/members/`, {headers}).subscribe(res => {
      var response = res as any[];
      this.members = response.map((member:any) => {
        let teamName = this.teams.find(team => team.id === member.team)?.name;
        let officeName = this.offices.find(office => office.id === member.office)?.name;
 
        return new Member(
          member._id,
          member.name,
          member.email,
          member.image,
          member.createdAt,
          member.team,
          teamName,
          "", // Start date property
          member.office,
          officeName,
          member.calculatedStatus
          );
      });
      this.gridMembers = this.members.slice();
      this.setStatusFiltersData();
      console.log(this.members);
    });
  }
 
  private setStatusFiltersData() {
    this.leadMemberStatusCount = this.members.filter(m => m.calculatedStatus === "lead").length;
    this.dropInMemberStatusCount = this.members.filter(m => m.calculatedStatus === "drop-in").length;
    this.activeMemberStatusCount = this.members.filter(m => m.calculatedStatus === "active").length;
    this.formerMemberStatusCount = this.members.filter(m => m.calculatedStatus === "former").length;
    this.allMemberStatusCount = this.leadMemberStatusCount + this.dropInMemberStatusCount + this.activeMemberStatusCount + this.formerMemberStatusCount;
  }
 
  onOfficeFilterChange(value:string) {
    this.selectedOffice = value;
  }
 
  onTeamFilterChange(value:string) {
    this.selectedTeam = value;
  }
 
  onFilterGrid(event:any) {
    if (this.selectedOffice === "all" && this.selectedTeam === "all") {
      this.gridMembers = this.members.slice();
    } else if (this.selectedOffice !== "all" && this.selectedTeam === "all") {
      this.gridMembers = this.members.filter(m => m.officeId === this.selectedOffice).slice();
    } else if (this.selectedOffice === "all" && this.selectedTeam !== "all") {
      this.gridMembers = this.members.filter(m => m.teamId === this.selectedTeam).slice();
    } else {
      this.gridMembers = this.members.filter(m => m.officeId === this.selectedOffice && m.teamId === this.selectedTeam).slice();
    }
  }
 
  selectAll() {
    for (var i = 0; i < this.members.length; i++) {
    this.members[i].selected = true;
    }
  }
  checkIfAllSelected() {
    this.selectAll = this.gridMembers.every(function(item:any) {
        return item.selected == true;
      })
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}