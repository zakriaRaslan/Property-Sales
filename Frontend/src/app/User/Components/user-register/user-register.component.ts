import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../../Validators/confirm-password.validator';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/User';
import { AlertifyService } from 'src/app/Shared/Services/alertify.service';




@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm!:FormGroup ;
  formSubmitted:boolean = false;
  user!:User;
  constructor(private fb :FormBuilder,private userService:UserService , private alertifyService : AlertifyService) { }

  ngOnInit(): void {
    this.initializeUserRegisterForm();
  }

  initializeUserRegisterForm(){
    this.userRegisterForm = this.fb.group({
      userName:['',[Validators.required, Validators.maxLength(10) , Validators.minLength(3)]],
      email:['',[Validators.required , Validators.email ]],
      password:['',[Validators.required ,Validators.maxLength(20),Validators.minLength(8)]],
      confirmPassword:['',[Validators.required ,Validators.maxLength(20),Validators.minLength(8)]],
      phoneNumber:['',[Validators.required , Validators.minLength(8) ,Validators.pattern("^01[0125][0-9]{8}$")]]
    },{
      validators: [Validation.match('password', 'confirmPassword')]
    })
  }



  onSubmit(){
    this.formSubmitted = true
    if(this.userRegisterForm.valid){
      this.userService.SaveUsers(this.userData());
      this.userRegisterForm.reset();
      this.formSubmitted = false;
      this.alertifyService.Success('Congratulation You Already Registered')
    }else{
      this.alertifyService.Error("Pleaser Input The Required Fields")
    }
  }

  userData():User{
    return this.user={
      userName:this.userName.value,
      email:this.email.value,
      password:this.password.value,
      confirmPassword:this.confirmPassword.value,
      phoneNumber:this.phoneNumber.value
    }
  }

  resetForm(){
    this.userRegisterForm.reset();
  }
 //#region <Getter Methods>
  get userName(){
    return this.userRegisterForm.get('userName') as FormControl
   }
  get email(){
    return this.userRegisterForm.get('email') as FormControl
   }
  get password(){
    return this.userRegisterForm.get('password') as FormControl
   }
  get confirmPassword(){
    return this.userRegisterForm.get('confirmPassword') as FormControl
   }
  get phoneNumber(){
    return this.userRegisterForm.get('phoneNumber') as FormControl
   }
 // #endregion
}
