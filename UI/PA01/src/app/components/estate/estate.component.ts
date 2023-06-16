import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { estate } from 'src/app/models/estate';
import { APIService } from 'src/app/services/API.service';
import { AlertService } from 'src/app/services/alert.service';
import { EstateDialogComponent } from '../dialog/estate-dialog/estate-dialog.component';
import { result } from 'src/app/models/result';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { EstateimageDialogComponent } from '../dialog/estateimage-dialog/estateimage-dialog.component';
import { UserPic } from 'src/app/models/UserPic';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.css']
})
export class EstateComponent implements OnInit {
  Estates:estate[];
  dataSource:any;
  displayedColumns=['EstateIMG1','EstateName','EstateAdress','EstateLocation','IsActive','EstatePrice','islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef:MatDialogRef<EstateDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  imgDialogRef:MatDialogRef<EstateimageDialogComponent>;

  constructor(
    public API: APIService,
    public alert:AlertService,
    public matDialog: MatDialog

  ) { }

  ngOnInit() {
    this.listEstates();
  }
  listEstates(){
    this.API.listEstates().subscribe((e:estate[])=>{
      this.Estates=e;
      this.dataSource=new MatTableDataSource(e);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
    var newReg: estate = new estate();
     this.dialogRef=this.matDialog.open(EstateDialogComponent,{
       width: '400px',
       data:{
         Reg :newReg,
         Action : 'add'
       }
     });
     this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.API.AddEstate(d).subscribe((r:result)=>{
          this.alert.AlertExecute(r);
          if (r.Result){
            this.listEstates();
          }
        });
      }
     });
   }
   edit(entry:estate){
    this.dialogRef = this.matDialog.open(EstateDialogComponent,{
      width: '400px',
      data: {
        Reg: entry,
        Action: 'edit',
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        d.EstateId = entry.EstateId;
        this.API.UpdateEstate(d).subscribe((r:result)=>{
          this.alert.AlertExecute(r);
          if (r.Result){
            this.listEstates();
          }
        });
      }
     });
   }
   del(entry:estate){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMSG = entry.EstateName + " isimli konutu silinecektir. Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.API.DeleteEstate(entry.EstateId).subscribe((r:result)=>{
          this.alert.AlertExecute(r);
          if (r.Result){
            this.listEstates();
          }
        });
      }
    })
   }
   UpdateFoto(u:estate){
    console.log(u);
    this.imgDialogRef = this.matDialog.open(EstateimageDialogComponent,{
      width: '400px',
      data: u,
    })
    this.imgDialogRef.afterClosed().subscribe((d:UserPic)=>{
      if (d){
        d.UserId = u.EstateId;
        console.log(d);
        this.API.UpdateEstatePic(d).subscribe((r:result)=>{
          this.alert.AlertExecute(r);
          this.listEstates();
        })
      }
    })
  }
}
