import { Component, OnInit } from '@angular/core';
import { UserPic } from 'src/app/models/UserPic';
import { result } from 'src/app/models/result';
import { user } from 'src/app/models/user';
import { APIService } from 'src/app/services/API.service';
import { UploadimageDialogComponent } from '../dialog/uploadimage-dialog/uploadimage-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  UID:string;
  CurrentUser:user;
  CurrentIMG:string;
  imgDialogRef:MatDialogRef<UploadimageDialogComponent>;

  constructor(
    public API:APIService,
    public matDialog:MatDialog,
    public alert:AlertService,
    public router: Router

  ) { }

  ngOnInit() {
    this.getuserData();
    console.log(this.CurrentIMG)
  }

  getuserData(){
    if (localStorage.getItem("uid")!=null) {
      this.UID = localStorage.getItem("uid");
      this.API.UserById(this.UID).subscribe((d:user)=>
      {
        this.CurrentUser = d;
        this.CurrentIMG = d.UserProfileIMG;
      })
    } else {
      //geri dönüş ekle
    }


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
        })
      }
    })
  }

}
