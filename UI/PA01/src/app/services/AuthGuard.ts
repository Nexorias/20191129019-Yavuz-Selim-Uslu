import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { APIService } from "./API.service";
import { AlertService } from "./alert.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    public API:APIService,
    public Alert: AlertService,
    public router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var perms=route.data["perms"] as Array<string>;
    var backurl= route.data["back"] as string;
    if (!this.API.checkToken() || !perms || !perms.length) {
      this.router.navigate([backurl]);
      return false;
    }

    var result:boolean=false;

    result = this.API.CheckGuardAdmin(perms);
    console.log(result);
    if (!result){
      this.router.navigate([backurl]);
    }
    return result;
  }
}
