import { ViewChild,Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { banner } from 'src/app/models/banner';
import { Location } from 'src/app/models/location';
import { estate } from 'src/app/models/estate';
import { result } from 'src/app/models/result';
import { user } from 'src/app/models/user';
import { APIService } from 'src/app/services/API.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-listEstates',
  templateUrl: './listEstates.component.html',
  styleUrls: ['./listEstates.component.css']
})
export class ListEstatesComponent implements OnInit {
  Banners: banner[];
  Estates: estate[];
  Locations: Location[];
  LocationName: any;
  CurrentUser: any;
  UserValue: any;
  SavedUserId: string;
  SavedEstateId: string="nil";
  SavedUserName: string;
  dataSource:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  displayedColumns = ['EstateIMG1','EstateName','EstateAdress','EstateLocation','EstatePrice','islemler'];
  constructor(
    public API:APIService,
    public Alert:AlertService,
    public Route:ActivatedRoute,
    public matDialog:MatDialog

  ) { }

  ngOnInit() {

    this.Route.params.subscribe(p=>{
      if (p){
        console.log(p);
         this.UserValue = p;
         this.SavedUserId = this.UserValue.UserId;
         this.getUserData();
         this.listBanners();
         this.listEstates();
      }
    });
  }
  getUserData(){
    this.API.UserById(this.SavedUserId).subscribe((d:user)=>{
      this.CurrentUser = d;
      this.SavedUserName = d.UserFullName;

    } );
  }

  getLocationName(locationId: string) {
   this.API.LocationById(locationId).subscribe((d:Location)=>{
    this.LocationName = d.LocationName;
   })
  }
  listBanners(){
    this.API.listEstatesForUser(this.SavedUserId).subscribe((b:banner[])=>{
      this.Banners = b;
    this.dataSource = new MatTableDataSource(this.Banners)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
  });

  }
  listEstates(){
    this.API.listEstates().subscribe((e:estate[])=>{
      this.Estates = e;
    });
  }
  SelectEstate(Id:string){
    console.log(Id);
    this.SavedEstateId = Id;
  }

  save()
  {
    console.log(this.SavedEstateId);
    if (this.SavedEstateId=="nil"){
      var r: result = new result();
      r.Result = false;
      r.msg = "Ev seçiniz";
      this.Alert.AlertExecute(r);
      return false;
    }

    var bnr:banner = new banner();
    bnr.BannerEstateId = this.SavedEstateId;
    bnr.BannerUserId = this.SavedUserId;
    this.API.AddBanner(bnr).subscribe((r:result)=>{
      this.Alert.AlertExecute(r);
      this.listBanners();
    })
    return true;
  }
  deleteEntry(bnr:banner)
  {
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,
      {
        width:'400px'
      });
      this.confirmDialogRef.componentInstance.dialogMSG = "'" +bnr.EstateInfo.EstateName + "' adlı konut silinecek, onaylıyor musunuz?";
      this.confirmDialogRef.afterClosed().subscribe(d=>{
        if (d){
          this.API.DeleteBanner(bnr.BannerId).subscribe((r:result)=>
          {
            if (r.Result){
              this.listBanners();
            }
          })
        } else {

        }
      });
  }
}
