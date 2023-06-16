import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { result } from 'src/app/models/result';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { estate } from 'src/app/models/estate';
import { APIService } from 'src/app/services/API.service';
;
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopsection',
  templateUrl: './shopsection.component.html',
  styleUrls: ['./shopsection.component.css']
})
export class ShopsectionComponent implements OnInit {
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

}
