import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HousingService } from 'src/app/Services/housing.service';
import { Property } from '../../Models/Property';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
propertyId:number=0;
property= new Property();
  constructor(private activeRoute:ActivatedRoute,private router:Router,private housingService:HousingService) { }

  ngOnInit(): void {
    this.propertyId = +this.activeRoute.snapshot.params["id"];
    this.activeRoute.data.subscribe(
      (data:any)=>{
        this.property = data['prop'];
      }
    )
    //   this.activeRoute.params.subscribe(param=>{
    //   this.propertyId = +param['id'];
    //   this.housingService.getProperty(this.propertyId).subscribe((data:any)=>{
    //     this.property = data
    //   })
    // })
  }

  GoToNext(){
    this.propertyId += 1;
    this.router.navigate(['property-detail',this.propertyId]);
  }
}
