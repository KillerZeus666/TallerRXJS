import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TallerRXJS';

  ROOT_URL = "https://dummyjson.com";

  //Declaramos lo que necesitamos
  txUser: string = "";

  searchUser(){

  }
}