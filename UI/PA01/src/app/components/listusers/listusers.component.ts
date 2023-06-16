import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { banner } from 'src/app/models/banner';
import { estate } from 'src/app/models/estate';
import { APIService } from 'src/app/services/API.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { result } from 'src/app/models/result';
import { AlertService } from 'src/app/services/alert.service';
import { SelectuserDialogComponent } from '../dialog/selectuser-dialog/selectuser-dialog.component';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
EstateId: string;
EstateValue: any;
SavedEstate: estate;
Testdata: string;
SavedEstateName: string;

banners: banner[];
displayedColumns = ['UserProfileIMG','UserFullName','UserMail','UserIsAdmin','UserRegDate','UserEstateAmount','islemler'];
dataSource:any;
confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
dialogRef:MatDialogRef<SelectuserDialogComponent>;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
public API: APIService,
public route: ActivatedRoute,
public matDialog:MatDialog,
public alert: AlertService


  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if (p){
         this.EstateValue = p;
         this.EstateId = this.EstateValue.EstateId;
         this.getEstateData();
         console.log(this.SavedEstate);
         this.ListBanners();
      }
    });
  }

  getEstateData(){
    this.API.EstateById(this.EstateId).subscribe((d:estate)=>{
      this.SavedEstate = d;
      this.SavedEstateName = d.EstateName;
    } );
  }
  ListBanners(){
    this.API.listUsersForEstate(this.EstateId).subscribe((d:banner[])=>{
      this.banners = d;
      this.dataSource= new MatTableDataSource(this.banners);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  add(){
    this.dialogRef = this.matDialog.open(SelectuserDialogComponent,{
      width: '800px'
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        var bnr:banner = new banner();
        bnr.BannerUserId = d.UserId;
        bnr.BannerEstateId = this.EstateId;
        this.API.AddBanner(bnr).subscribe((r:result)=>{
          this.alert.AlertExecute(r);
          if (r.Result) {
            this.ListBanners();
          }
        });

      }
    })
  }

  del(entry:banner){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMSG = entry.UserInfo.UserFullName + " Adlı kullanıcıyı bu konut sahipliğinden çıkaracaksınız, onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.API.DeleteBanner(entry.BannerId).subscribe((r:result)=>{
          this.alert.AlertExecute(r);
          if (r.Result){
            this.ListBanners();
          }
        })
      }
    })
  }
}
