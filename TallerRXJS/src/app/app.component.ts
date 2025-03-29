import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';
;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TallerRXJS';
  ROOT_URL = "https://dummyjson.com";

  // Para Realizar Peticiones HTTP
  constructor(private http: HttpClient) {}
  
  // 1. Crear un Observable
  user$: Observable<any> = new Observable();

  usuario: User | null = null;

  // Declaramos la variable para almacenar el usuario
  txUser: string = "";

  searchUser() {
    this.user$ = this.http.get<User>(`${this.ROOT_URL}/users/1`);
    // Suscribirnos a dicha petición
    this.user$.subscribe((userInfo) => {
      this.usuario = userInfo;
    });
  }
}
