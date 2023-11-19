import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
propertyId:number=0;
  constructor(private activeRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.propertyId = +this.activeRoute.snapshot.params["id"];

      this.activeRoute.params.subscribe(param=>{
      this.propertyId = +param['id'];
    })
  }

  GoToNext(){
    this.propertyId += 1;
    this.router.navigate(['property-detail',this.propertyId]);
  }
}
