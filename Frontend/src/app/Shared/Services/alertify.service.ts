import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs'
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  Success(message:string){
    return alertify.success(message);
  }

  Error(message:string){
    return alertify.error(message);
  }

  Warning(message:string){
    return alertify.warning(message);
  }
}
