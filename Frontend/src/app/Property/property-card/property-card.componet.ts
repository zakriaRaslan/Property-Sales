import { Component, OnInit } from "@angular/core";

@Component({
  selector:'app-property-card',
  // template:`<h2>Hello From PropertyCard</h2>`,
  templateUrl:'property-card.component.html',
  // styles:['h2{font-weight:normal;}']
  styleUrls:['property-card.component.css']
}
)

export class PropertyCardComponent implements OnInit{

  property:any={
    Id:1,
    Name:'Raslan House',
    Type:'House',
    Price:1200000
  }
  constructor(){

  }

  ngOnInit(){

  }
}
