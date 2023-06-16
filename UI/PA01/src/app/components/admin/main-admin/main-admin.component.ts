import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})

export class MainAdminComponent implements OnInit {
  color: string;
  cols: number;
  rows: number;
  text: string;
  tiles: Tile[] = [
    {text: 'Kullanıcılar', cols: 3, rows: 1, color: '#98b4d4', icon: 'person', route:"/users", tooltip:"Kullanıcı Yönetim"},
    {text: '', cols: 1, rows: 2, color: '#f1e7dd', icon: 'exit_to_app',route:"/",tooltip:"Ana sayfaya geri dönün"},
    {text: 'Bölgeler', cols: 1, rows: 1, color: '#b0b0b0', icon: 'room',route:"/locations",tooltip:"Bölgeleri Yönetin"},
    {text: 'Konutlar', cols: 2, rows: 1, color: '#c1b8ab', icon: 'store',route:"/estates",tooltip:"Konutları Yönetin"},
  ];;
  constructor(
    public router: Router

  ) { }

  ngOnInit() {
  }

  navigate(text){

    this.router.navigate([text]);
  }
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  icon: string;
  route: string;
  tooltip: string;
}
