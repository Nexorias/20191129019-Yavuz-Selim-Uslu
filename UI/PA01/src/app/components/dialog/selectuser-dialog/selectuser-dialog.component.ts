import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { user } from 'src/app/models/user';
import { APIService } from 'src/app/services/API.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UploadimageDialogComponent } from '../uploadimage-dialog/uploadimage-dialog.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-selectuser-dialog',
  templateUrl: './selectuser-dialog.component.html',
  styleUrls: ['./selectuser-dialog.component.css']
})
export class SelectuserDialogComponent implements OnInit {
  Users: user[];
  displayedColumns = ['UserProfileIMG','UserFullName','UserMail','UserRegDate','UserEstateAmount','actions'];
  dataSource:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  imgDialogRef:MatDialogRef<UploadimageDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public API : APIService,
    public matDialog:MatDialog,
    public alert:AlertService,
    public  dialogRef:MatDialogRef<UserDialogComponent>

  ) { }

  ngOnInit() {
    this.ListUsers()
  }


  ListUsers(){
    this.API.listUsers().subscribe((d:user[])=>{
      this.Users = d;
      this.dataSource= new MatTableDataSource(this.Users);
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
  selectUser(us:user){
    this.dialogRef.close(us);
  }
}
