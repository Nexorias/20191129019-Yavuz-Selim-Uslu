import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { user } from 'src/app/models/user';
import { APIService } from 'src/app/services/API.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  DialogHeader: string;
  Action: string;
  form: FormGroup;
  NewReg: user;
  constructor(
    public API: APIService,
    public MatDialog: MatDialog,
    public formBuild: FormBuilder,
    public DialogRef:MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    console.log(data);
    this.Action = data.Action;
    this.NewReg = data.Reg;
    if (this.Action == 'add'){
      this.DialogHeader="Kullanıcı Ekle";
    }
    if (this.Action == 'edit'){
      this.DialogHeader="Kullanıcı Düzenle";
    }
    this.form=this.creatform();
  }

  ngOnInit() {
  }

  creatform(){
    return this.formBuild.group({
        UserId:[this.NewReg.UserId],
        UserFullName:[this.NewReg.UserFullName],
        UserRegDate:[this.NewReg.UserRegDate],
        UserMail:[this.NewReg.UserMail],
        UserPassword:[this.NewReg.UserPassword],
        UserIsAdmin :[this.NewReg.UserIsAdmin],
    });
  }
}
