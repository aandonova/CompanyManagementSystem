import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/Member';
 
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
 
export class MemberComponent implements OnInit {
  @Input()
  member!: Member;
 
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute) { 
  }
 
  ngOnInit() {
  }
}
 