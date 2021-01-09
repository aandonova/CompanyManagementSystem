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
    this.http.get(`${baseApiUrl}/members/`, {headers}).subscribe(res => {
      console.log(res, 'response');
    });
    this.http.get(`${baseApiUrl}/team/`, {headers}).subscribe(res => {
      console.log(res, 'response');
    });
    this.http.get(`${baseApiUrl}/office/`, {headers}).subscribe(res => {
      console.log(res, 'response');
    });
  }
}