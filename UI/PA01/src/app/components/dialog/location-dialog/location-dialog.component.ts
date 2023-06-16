import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from 'src/app/models/location';
import { APIService } from 'src/app/services/API.service';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent implements OnInit {
  dialogHeader: string;
  Action: string;
  form: FormGroup;
  NewReg: Location;
  constructor(
    public API: APIService,
    public MatDialog: MatDialog,
    public formBuild: FormBuilder,
    public DialogRef:MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    console.log(data);
    this.Action = data.Action;
    this.NewReg = data.Reg;
    if (this.Action == 'add'){
      this.dialogHeader="Bölge Ekle";
    }
    if (this.Action == 'edit'){
      this.dialogHeader="Bölge Düzenle";
    }
    this.form=this.creatform();
  }

  ngOnInit() {
  }

  creatform(){
    return this.formBuild.group({
      LocationId:[this.NewReg.LocationId],
      LocationName:[this.NewReg.LocationName],
    });
  }
}
