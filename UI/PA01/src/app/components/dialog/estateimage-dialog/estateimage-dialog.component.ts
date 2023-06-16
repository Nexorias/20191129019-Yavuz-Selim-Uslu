import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UserPic } from 'src/app/models/UserPic';
import { estate } from 'src/app/models/estate';
import { APIService } from 'src/app/services/API.service';

@Component({
  selector: 'app-estateimage-dialog',
  templateUrl: './estateimage-dialog.component.html',
  styleUrls: ['./estateimage-dialog.component.css']
})
export class EstateimageDialogComponent implements OnInit {
  SelectedImage: any;
  selectOrder:any;
  UserImg:UserPic = new UserPic();
  SelectedEstate: estate;
  constructor(
    public imgDialogRef:MatDialogRef<EstateimageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public API: APIService
  ) {
    this.SelectedEstate = this.data;
    this.selectOrder = "1";
  }

  ngOnInit() {
  }

  PicImage(e,order){

    var Images=e.target.files;
    var Image = Images[0];
    var fr = new FileReader();
    fr.onloadend=()=>{
      this.SelectedImage = fr.result;
      this.UserImg.ImgData =fr.result.toString();
      this.UserImg.ImgSrc = Image.type;
      this.UserImg.ImgOrder = order;
    }
    console.log(this.UserImg);
    fr.readAsDataURL(Image);

  }
}
