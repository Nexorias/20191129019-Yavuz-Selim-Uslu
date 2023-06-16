import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { estate } from '../models/estate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { banner } from '../models/banner';
import { UserPic } from '../models/UserPic';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class APIService {
apiURL = "https://localhost:44342/api/";
siteURL = "https://localhost:44342/"

constructor(
  public http: HttpClient

) { }
// Login stuff
pulltoken(mail:string,password:string){
  var data="username="+mail+"&password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
  return this.http.post(this.apiURL + "token", data, { headers: reqHeader });

}

checkToken(){
  if(localStorage.getItem("token")){
    return true;
  } else {
    return false;
  }
}

CheckLocalAdmin(){
  if(localStorage.getItem("Perms")=='["Admin"]'){
    return true;
  } else {
    return false;
  }
}
CheckGuardAdmin(perms){
  var r: boolean = false;

  var UserPerms: string[] = JSON.parse(localStorage.getItem("Perms"));

  if (UserPerms) {
    perms.forEach(element => {
      if (UserPerms.indexOf(element) > -1) {
        r = true;
      }
    });
  }

  return r;
}
//Users
listUsers(){
  return this.http.get(this.apiURL+"listUsers");
}

returntest(){
  return this.http.get(this.apiURL+"returntest")
}

UserById(Id:String){
  return this.http.get(this.apiURL+"UserById/"+Id);
}

AddUser(u: user){
  return this.http.post(this.apiURL+"addUser",u);
}

UpdateUser(u:user){
  return this.http.put(this.apiURL+"updateUser",u);
}
DeleteUser(Id:string){
  return this.http.delete(this.apiURL+"deleteUser/"+Id)
}
UpdateProfilePic(u:UserPic){
  console.log("came");
  return this.http.post(this.apiURL+"updateprofilepic",u)
}
//Estate
listEstates(){
  return this.http.get(this.apiURL+"listEstate");
}

EstateById(Id:String){
  return this.http.get(this.apiURL+"Estatebyid/"+Id);
}

AddEstate(e: estate){
  return this.http.post(this.apiURL+"addEstate",e);
}

UpdateEstate(e:estate){
  console.log("came");
  return this.http.put(this.apiURL+"UpdateEstate",e);
}
DeleteEstate(Id:string){
  return this.http.delete(this.apiURL+"deleteEstate/"+Id);
}
UpdateEstatePic(d:UserPic){
  console.log("came");
  return this.http.post(this.apiURL+"updateEstatePic",d);
}

//banner
listEstatesForUser(Id:string){
  return this.http.get(this.apiURL+"EstatesofUser/"+Id);
}

listUsersForEstate(Id:string){
  return this.http.get(this.apiURL+"UsersofEstate/"+Id);
}

AddBanner(b: banner){
  return this.http.post(this.apiURL+"addbanner",b);
}

DeleteBanner(Id:string){
  return this.http.delete(this.apiURL+"deletebanner/"+Id)
}
//locations
listLocations(){
  return this.http.get(this.apiURL+"listlocations");
}

LocationById(Id:String){
  return this.http.get(this.apiURL+"locationbyId/"+Id);
}

AddLocation(e: Location){
  return this.http.post(this.apiURL+"addlocation",e);
}

UpdateLocation(e:Location){
  return this.http.put(this.apiURL+"updatelocation",e);
}
Deletelocation(Id:string){
  return this.http.delete(this.apiURL+"deletelocation/"+Id)

}
}
