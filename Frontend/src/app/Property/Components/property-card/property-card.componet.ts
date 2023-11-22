import { Component, Input, OnInit } from "@angular/core";
import { IPropertyBase } from "../../Models/IpropertyBase";


@Component({
  selector:'app-property-card',
  // template:`<h2>Hello From PropertyCard</h2>`,
  templateUrl:'property-card.component.html',
  // styles:['h2{font-weight:normal;}']
  styleUrls:['property-card.component.css']
}
)

export class PropertyCardComponent implements OnInit{
@Input() property!:IPropertyBase;
@Input() hideIcons:boolean=false;
  constructor(){

  }

  ngOnInit(){

  }
}
