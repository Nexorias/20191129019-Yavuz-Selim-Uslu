import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { estate } from 'src/app/models/estate';
import { APIService } from 'src/app/services/API.service';

@Component({
  selector: 'app-estatedetails',
  templateUrl: './estatedetails.component.html',
  styleUrls: ['./estatedetails.component.css']
})
export class EstatedetailsComponent implements OnInit {
  EstateId: string;
  EstateValue: any;
  SavedEstateName: string;

  SavedEstate: estate;
  constructor(
    public route: ActivatedRoute,
    public API: APIService,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if (p){
         this.EstateValue = p;
         this.EstateId = this.EstateValue.EstateId;
         this.getEstateData();
      }
    });
  }

  getEstateData(){
    this.API.EstateById(this.EstateId).subscribe((d:estate)=>{
      this.SavedEstate = d;
      this.SavedEstateName = d.EstateName;
    } );
  }
}
