import { Component, OnInit } from '@angular/core';
import { MatDialog  } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { estate } from 'src/app/models/estate';
import { APIService } from 'src/app/services/API.service';
;
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  slideIndex = 1;
  EstateList: estate[];


  constructor(
public alert:AlertService,
public matDialog:MatDialog,
public API: APIService,
public router: Router
  ) { }

  ngOnInit() {
    this.listEstates();

  }

  listEstates(){
    this.API.listEstates().subscribe((e:estate[])=>{
      e=e.filter( estate =>  estate.IsActive === '1');
      this.EstateList = e;
    })
  }


  navigate()
  {
    this.router.navigate(['/shop']);

  }

}
