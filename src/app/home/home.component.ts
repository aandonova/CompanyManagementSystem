import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public membersMarkedForDeletion: Member[] = [];
  public activeFilter: string = "all";
 
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
    });
    this.http.get(`${baseApiUrl}/offices/`, {headers}).subscribe(res => {
      var response = res as any[];
      this.offices = response.map((office: { _id: string; name: string; }) => {
        return new Office(office._id, office.name);
      });
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
 
  onFilterGrid() {
    this.onFilter();
  }
 
  onFilterStatusClick(filter:string) {
    this.activeFilter = filter;
    this.onFilter();
  }
 
  onFilter() {
    let filteredMembers = this.members.slice();
    if (this.selectedOffice !== "all" && this.selectedTeam !== "all") {
      filteredMembers = filteredMembers.filter(m => m.officeId === this.selectedOffice && m.teamId === this.selectedTeam).slice();
    } else if (this.selectedOffice !== "all" && this.selectedTeam === "all") {
      filteredMembers = filteredMembers.filter(m => m.officeId === this.selectedOffice).slice();
    } else if (this.selectedOffice === "all" && this.selectedTeam !== "all") {
      filteredMembers = filteredMembers.filter(m => m.teamId === this.selectedTeam).slice();
    }
    
    if (this.activeFilter === "all") {
      this.gridMembers = filteredMembers.slice();
    } else if (this.activeFilter === "dropIn") {
      this.gridMembers = filteredMembers.filter(m => m.calculatedStatus === "drop-in").slice();
    } else {
      this.gridMembers = filteredMembers.filter(m => m.calculatedStatus === this.activeFilter).slice();
    }
  }
 
  onMemberAllSelection(event:any) {
    if (event.target.checked) {
      this.membersMarkedForDeletion = [];
      this.membersMarkedForDeletion = this.gridMembers.slice();
      this.gridMembers.forEach((member) => {
        member.selected = true;
      });
    } else {
      this.membersMarkedForDeletion = [];
      this.gridMembers.forEach((member) => {
        member.selected = false;
      });
    }
  }
 
  onMemberSelection(event:any) {
    let memberId = event.target.value;
    if (event.target.checked) {
      let findMember = this.gridMembers.find(m => m.id === memberId);
      if (findMember !== undefined) {
        this.membersMarkedForDeletion.push(findMember);
      }
    } else {
      this.membersMarkedForDeletion = this.membersMarkedForDeletion.filter(m => m.id !== memberId);
    }
  }
 
  deleteMembers(modal:any) {
    this.membersMarkedForDeletion.forEach((member) => {
      var baseApiUrl = ApiConfig.getBaseUrl();
      var headers = ApiConfig.getDefaultHeaders();
      this.http.delete(`${baseApiUrl}/members/${member.id}`, {headers}).subscribe(res => {
        let response = res as { _id: string };
        if (response._id === member.id) {
          this.gridMembers = this.gridMembers.filter(m => m.id !== member.id);
        }
      });
 
      modal.dismiss();
    });
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