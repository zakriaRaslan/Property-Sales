import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/Services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from '../../Models/IpropertyBase';
import { Property } from '../../Models/Property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: Array<IPropertyBase> = [];
  SellRent:number = 1;
  City:string='';
  SearchCity:string = "";
  SortbyParam:string =''
  SortDirection:string ='asc'

  constructor(private housingService:HousingService , private activateRoute:ActivatedRoute) {}

  ngOnInit() {
    if(this.activateRoute.snapshot.url.toString()){
      this.SellRent=2
    }

    this.housingService.getAllProperties(this.SellRent).subscribe(data=>{
      this.properties = data;
    },error=>{
      console.log('httpError: ');
      console.log(error);
    }
    )
  }

  onCityFilter(){
    this.SearchCity = this.City;
  }

  onCityFilterClear(){
    this.SearchCity = ''
  }

  onSortDirection(){
    if(this.SortDirection == 'asc'){
      this.SortDirection = 'desc'
    }else{
      this.SortDirection = 'asc'
    }
  }
}
