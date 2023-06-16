import { Injectable } from '@angular/core';
import { MatDialog,MatDialogRef} from '@angular/material/dialog';
import { result } from '../models/result';
import { AlertDialogComponent } from '../components/dialog/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
 private AlertDialogRef!: MatDialogRef<AlertDialogComponent>;

constructor(
  private MatDialog: MatDialog

) { }

AlertExecute(r:result){
  var info = "";
  if (r.Result) {
    info = "Success";
  } else {
    info = "Error";
  }
  this.AlertDialogRef=this.MatDialog.open(AlertDialogComponent,
    {width: '400px'});
    this.AlertDialogRef.componentInstance.dialogAction = r.Result;
    this.AlertDialogRef.componentInstance.dialogMSG = r.msg;
    this.AlertDialogRef.componentInstance.dialogTitle = info;

    this.AlertDialogRef.afterClosed().subscribe(d=>{
      this.AlertDialogRef =  null;
    });

}


}
