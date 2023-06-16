import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserPic } from 'src/app/models/UserPic';
import { user } from 'src/app/models/user';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from 'src/app/services/API.service';

@Component({
  selector: 'app-uploadimage-dialog',
  templateUrl: './uploadimage-dialog.component.html',
  styleUrls: ['./uploadimage-dialog.component.css']
})
export class UploadimageDialogComponent implements OnInit {
SelectedImage: any;
UserImg:UserPic = new UserPic();
SelectedUser: user;
  constructor(
    public imgDialogRef:MatDialogRef<UploadimageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public API: APIService
  ) {
    this.SelectedUser = this.data;

  }

  ngOnInit() {
  }

  PicImage(e){
    var Images=e.target.files;
    var Image = Images[0];
    var fr = new FileReader();
    fr.onloadend=()=>{
      this.SelectedImage = fr.result;
      this.UserImg.ImgData =fr.result.toString();
      this.UserImg.ImgSrc = Image.type;
    }
    fr.readAsDataURL(Image);

  }
}
