import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/Team';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute)
    { 
    }

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   this.http.get(`/api/members/`).subscribe(res => {
    //     this.member = res as Member;
    //   });
    // });
  }
}


