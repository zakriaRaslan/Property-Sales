import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../Services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName:any
  constructor(private router:Router,private alertify:AlertifyService) { }

  ngOnInit(): void {
  }
  isLoggedIn(){
    this.userName = localStorage.getItem('token');
    return this.userName
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['user/login'])
    this.alertify.Success("You Are Logged Out Successfully")
  }
}
