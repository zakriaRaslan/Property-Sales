import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { HousingService } from 'src/app/Services/housing.service';
import { Property } from '../../Models/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsResolver implements Resolve<Property | undefined> {
  constructor(private houseService:HousingService , private router:Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property | undefined> {
    const propId = route.params['id'];
    return this.houseService.getProperty(+propId).pipe(
      catchError(()=>{
        this.router.navigate(['/']);
        return EMPTY;
      })
    )
  }
}
