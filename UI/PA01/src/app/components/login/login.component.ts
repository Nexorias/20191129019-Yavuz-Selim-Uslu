import { Component, OnInit } from '@angular/core';
import { result } from 'src/app/models/result';
import { APIService } from 'src/app/services/API.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
public API:APIService,
public alert:AlertService
  ) { }

  ngOnInit() {
  }

  login(mail:string,pass:string){
    this.API.pulltoken(mail,pass).subscribe((d:any)=>{
      localStorage.setItem("token",d.access_token);
      localStorage.setItem("uid",d.UserId);
      localStorage.setItem("mail",d.UserMail);
      localStorage.setItem("Perms",d.UserPerms);
      location.href="/";

    },err=>{
      var r:result=new result();
      r.Result = false;
      r.msg = "Kullanıcı adı veya şifre geçersiz!";
      this.alert.AlertExecute(r);
    })

  }
}
