import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProperty } from '../Property/Models/IProperty.interface';
import { IPropertyBase } from '../Property/Models/IpropertyBase';
import { Property } from '../Property/Models/Property';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        const propertiesArray: Array<Property> = [];
        const localProperty = JSON.parse(localStorage.getItem('newProp')!);
        if (localProperty) {
          for (const Id in localProperty) {
            if (SellRent) {
              if (
                localProperty.hasOwnProperty(Id) &&
                localProperty[Id].SellRent == SellRent
              ) {
                propertiesArray.push(localProperty[Id]);
              }
            } else {
              propertiesArray.push(localProperty[Id]);
            }
          }
        }
        for (const Id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(Id) && data[Id].SellRent == SellRent) {
              propertiesArray.push(data[Id]);
            }
          } else {
            propertiesArray.push(data[Id]);
          }
        }
        return propertiesArray;
      })
    );
  }
  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        // throw new Error('error')
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }
  addProperty(property: Property) {
    let newProperty = [property];

    if (localStorage.getItem('newProp')) {
      newProperty = [property, ...JSON.parse(localStorage.getItem('newProp')!)];
    }
    localStorage.setItem('newProp', JSON.stringify(newProperty));
  }
  PropertyId() {
    if (localStorage.getItem('PID')) {
      const newID = +localStorage.getItem('PID')! + 1;
      localStorage.setItem('PID', newID.toString());
      return newID;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
