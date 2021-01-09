import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../models/Member';
import { Team } from '../models/Team';
import { Office } from '../models/Office';
import { ApiConfig } from '../api-config';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private members: Member[] = []
  private teams: Team [] = []
  private offices: Office [] = []
 
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute) {
  }
 
  ngOnInit(): void {
    var baseApiUrl = ApiConfig.getBaseUrl();
    var headers = ApiConfig.getDefaultHeaders();
    this.http.get(`${baseApiUrl}/teams/`, {headers}).subscribe(res => {
      this.teams = res.map((team: { _id: number; name: string; }) => {
        return new Team(team._id, team.name);
      });
      console.log(this.teams);
    });
    this.http.get(`${baseApiUrl}/offices/`, {headers}).subscribe(res => {
      this.offices = res.map((office: { _id: number; name: string; }) => {
        return new Office(office._id, office.name);
      });
      console.log(this.offices);
    });
  
    this.http.get(`${baseApiUrl}/members/`, {headers}).subscribe(res => {
      console.log(res, 'response');
    });
  }
}