import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { IProperty } from '../Property/Models/IProperty.interface';
import { IPropertyBase } from '../Property/Models/IpropertyBase';
import { Property } from '../Property/Models/Property';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent:number):Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map((data:any) => {
        const propertiesArray: Array<IPropertyBase> = [];
        for (const Id in data) {
          if (data.hasOwnProperty(Id) && data[Id].SellRent == SellRent) {
            propertiesArray.push(data[Id]);
          }
        }
        return propertiesArray;
      })
    );
  }
  addProperty(property:Property){
    localStorage.setItem('newProp',JSON.stringify(property))
  }
}
