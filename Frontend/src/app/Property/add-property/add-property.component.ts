import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
@ViewChild('form') addPropertyForm!:NgForm
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
GoBack(){
  this.route.navigate(["/"]);
}
SubmitForm(){
  console.log(this.addPropertyForm);
}
}
