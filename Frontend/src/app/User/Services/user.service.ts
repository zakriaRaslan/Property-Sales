import { Injectable } from '@angular/core';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  SaveUsers(user:User){
    let users=[];
    if(localStorage.getItem("Users")){
      users = JSON.parse(localStorage.getItem("Users")!);
      users = [...users,user];
    }else{
      users = [user];
    }
    localStorage.setItem("Users",JSON.stringify(users));
  }
}
