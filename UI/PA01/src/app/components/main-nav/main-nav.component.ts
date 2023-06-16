import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { APIService } from 'src/app/services/API.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  username: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
      public API:APIService
    ){}
    ngOnInit(): void {
      if (this.API.checkToken()){
        this.username = localStorage.getItem("mail");
      }
    }
    logout(){
      localStorage.clear();
      location.href="/home";
    }
}
