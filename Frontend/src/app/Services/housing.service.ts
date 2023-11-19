import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { IProperty } from '../Property/Models/IProperty.interface';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent:number):Observable<IProperty[]> {
    return this.http.get('data/properties.json').pipe(
      map((data:any) => {
        const propertiesArray: Array<IProperty> = [];
        for (const Id in data) {
          if (data.hasOwnProperty(Id) && data[Id].SaleRent == SellRent) {
            propertiesArray.push(data[Id]);
          }
        }
        return propertiesArray;
      })
    );
  }
}
