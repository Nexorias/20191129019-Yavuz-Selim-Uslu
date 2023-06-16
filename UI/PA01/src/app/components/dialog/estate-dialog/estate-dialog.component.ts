import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { estate } from 'src/app/models/estate';
import { Location } from 'src/app/models/location';
import { APIService } from 'src/app/services/API.service';

@Component({
  selector: 'app-estate-dialog',
  templateUrl: './estate-dialog.component.html',
  styleUrls: ['./estate-dialog.component.css']
})
export class EstateDialogComponent implements OnInit {
  dialogHeader: string;
  Action: string;
  form: FormGroup;
  NewReg: estate;
  activeLocations: Location[];
  constructor(
    public API: APIService,
    public MatDialog: MatDialog,
    public formBuild: FormBuilder,
    public DialogRef:MatDialogRef<EstateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    console.log(data);
    this.Action = data.Action;
    this.NewReg = data.Reg;
    if (this.Action == 'add'){
      this.dialogHeader="Konut Ekle";
    }
    if (this.Action == 'edit'){
      this.dialogHeader="Konut Düzenle";
    }
    this.form=this.creatform();
    this.listlocations()
  }

  ngOnInit() {
  }

  listlocations(){
    this.API.listLocations().subscribe((d:Location[])=>{
      this.activeLocations = d;
    });
  }
  creatform(){
    return this.formBuild.group({
      EstateId:[this.NewReg.EstateId],
      EstateName:[this.NewReg.EstateName],
      EstatePrice:[this.NewReg.EstatePrice],
      DiscountPrice:[this.NewReg.DiscountPrice],
      Clicks:[this.NewReg.Clicks],
      IsActive :[this.NewReg.IsActive],
      IsDiscount:[this.NewReg.IsDiscount],
      EstateAdress:[this.NewReg.EstateAdress],
      EstateDescription :[this.NewReg.EstateDescription],
      EstateLocationId:[this.NewReg.EstateLocationId],
      EstateRegDate :[this.NewReg.EstateRegDate],
      EstateEditDate :[this.NewReg.EstateEditDate],
      EstateUserAmount :[this.NewReg.EstateUserAmount],

    });
  }
}
