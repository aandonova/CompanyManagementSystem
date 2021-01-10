import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Office } from '../models/Office';
import { Team } from '../models/Team';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html'
})
 
export class MemberFormComponent {
  form = new FormGroup({
    "name": new FormControl("", Validators.required),
    "email": new FormControl(""),
    "phone": new FormControl(""),
    "startDate": new FormControl("")
  });
  @Input()
  offices: Office[] = []
  @Input()
  teams: Team[] = []
 
  constructor(
    private http: HttpClient,
    private modalService: NgbModal) { 
  }
 
  ngOnInit() {
  }
 
  onSubmit() {
 
  }
}
 