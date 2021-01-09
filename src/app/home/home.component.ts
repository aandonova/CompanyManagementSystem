import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../models/Member';
import { ApiConfig } from '../api-config';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //private offices: Office[]
  //private teams: Team[]
  private members: Member[] = []
 
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
  }
}