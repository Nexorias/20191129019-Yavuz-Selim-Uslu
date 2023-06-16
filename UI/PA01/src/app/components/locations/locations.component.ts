import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APIService } from 'src/app/services/API.service';
import { AlertService } from 'src/app/services/alert.service';
import { LocationDialogComponent } from '../dialog/location-dialog/location-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { result } from 'src/app/models/result';
import { user } from 'src/app/models/user';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { UserDialogComponent } from '../dialog/user-dialog/user-dialog.component';
import { Location } from 'src/app/models/location';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  dataSource:any;
  Locations: Location[];

  displayedColumns = ['LocationName','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef:MatDialogRef<LocationDialogComponent>;

  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public API : APIService,
    public matDialog:MatDialog,
    public alert:AlertService
  ) { }

  ngOnInit(  ) {
    this.ListLocations();

  }
  ListLocations(){
    this.API.listLocations().subscribe((d:Location[])=>{
      this.Locations = d;
      this.dataSource= new MatTableDataSource(this.Locations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }
  filter(e){
    var value = e.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  add(){
    var newReg: Location = new Location();
     this.dialogRef=this.matDialog.open(LocationDialogComponent,{
       width: '400px',
       data:{
         Reg :newReg,
         Action : 'add'
       }
     });
     this.dialogRef.afterClosed().subscribe(d=>{
       if (d) {
        console.log(d);
         this.API.AddLocation(d).subscribe((r:result)=>{
           this.alert.AlertExecute(r);
           console.log(r.Result);
           if (r.Result){
             this.ListLocations();
           }
         });
       }
     });
   }
   edit(reg:Location){
    this.dialogRef=this.matDialog.open(LocationDialogComponent,{
      width: '400px',
      data:{
        Reg :reg,
        Action : 'edit'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {


      reg.LocationName = d.LocationName;


      this.API.UpdateLocation(d).subscribe((r:result)=>{
      this.alert.AlertExecute(r);
      if (r.Result){
        this.ListLocations();
      }
      });
    }
    });
  }
  deletelocation(reg:Location){
    console.log(reg);
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMSG = reg.LocationName + "Bölgesi silenecek. Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
     if (d){
      this.API.Deletelocation(reg.LocationId).subscribe((r:result)=>{
        console.log(r);
        this.alert.AlertExecute(r);
        if (r.Result) {
          this.ListLocations();
        }
      })
     }
    });
  }
}
