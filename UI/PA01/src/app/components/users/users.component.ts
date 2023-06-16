import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { user } from 'src/app/models/user';
import { APIService } from 'src/app/services/API.service';
import { UserDialogComponent } from '../dialog/user-dialog/user-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { result } from 'src/app/models/result';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { UploadimageDialogComponent } from '../dialog/uploadimage-dialog/uploadimage-dialog.component';
import { UserPic } from 'src/app/models/UserPic';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Users: user[];
  displayedColumns = ['UserProfileIMG','UserFullName','UserMail','UserIsAdmin','UserRegDate','UserEstateAmount','actions'];
  dataSource:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef:MatDialogRef<UserDialogComponent>;
  imgDialogRef:MatDialogRef<UploadimageDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public API : APIService,
    public matDialog:MatDialog,
    public alert:AlertService
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
  add(){
   var newReg: user = new user();
    this.dialogRef=this.matDialog.open(UserDialogComponent,{
      width: '400px',
      data:{
        Reg :newReg,
        Action : 'add'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.API.AddUser(d).subscribe((r:result)=>{
          this.alert.AlertExecute(r);
          console.log(r.Result);
          if (r.Result){
            this.ListUsers();
          }
        });
      }
    });
  }
  edit(reg:user){
    this.dialogRef=this.matDialog.open(UserDialogComponent,{
      width: '400px',
      data:{
        Reg :reg,
        Action : 'edit'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {


      reg.UserId = d.UserId;
      reg.UserMail = d.UserMail;
      reg.UserIsAdmin = d.UserIsAdmin;
      reg.UserPassword = d.UserPassword;

      this.API.UpdateUser(d).subscribe((r:result)=>{
      this.alert.AlertExecute(r);
      if (r.Result){
        this.ListUsers();
      }
      });
    }
    });
  }
  deleteuser(reg:user){
    console.log(reg);
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMSG = reg.UserMail + " mailli Kullanıcı silinecektir. Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
     if (d){
      this.API.DeleteUser(reg.UserId).subscribe((r:result)=>{
        console.log(r);
        this.alert.AlertExecute(r);
        if (r.Result) {
          this.ListUsers();
        }
      })
     }
    });
  }
  UpdateFoto(u:user){
    this.imgDialogRef = this.matDialog.open(UploadimageDialogComponent,{
      width: '400px',
      data: u,
    })
    this.imgDialogRef.afterClosed().subscribe((d:UserPic)=>{
      if (d){
        d.UserId = u.UserId;
        this.API.UpdateProfilePic(d).subscribe((r:result)=>{
          this.alert.AlertExecute(r);
          if (r.Result) {
            this.ListUsers();
          }
        })
      }
    })
  }
  }
