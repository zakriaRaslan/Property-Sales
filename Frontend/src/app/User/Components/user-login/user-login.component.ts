import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { AlertifyService } from 'src/app/Shared/Services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    console.log(loginForm);
    const user = this.authService.authUser(loginForm.value);
    if (user) {
      localStorage.setItem('token', user.userName);
      this.alertify.Success('You Are LogIn Successfully ');
      this.router.navigate(['/'])
    } else {
      this.alertify.Error('The User Id Or Password Is Wrong');
    }
  }

}
