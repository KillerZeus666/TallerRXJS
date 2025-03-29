import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TallerRXJS';
  usuarioNoEncontrado: boolean = false; // Nueva variable

  ROOT_URL = "https://dummyjson.com";

  // Para Realizar Peticiones HTTP
  constructor(private http: HttpClient) {}
  
  // 1. Crear un Observable
  // user$: Observable<any> = new Observable();

  usuario: User | null = null;

  // Declaramos la variable para almacenar el usuario
  txUser: string = "";

  searchUser() {
    if (!this.txUser.trim()) {
      console.warn("El campo de búsqueda está vacío.");
      this.usuario = null;
      this.usuarioNoEncontrado = false;
      return;
    }

    this.http.get<any>(`${this.ROOT_URL}/users/search?q=${this.txUser}`).subscribe({
      next: (userInfo) => {
        if (userInfo.users && userInfo.users.length > 0) {
          this.usuario = userInfo.users[0];
          this.usuarioNoEncontrado = false;
        } else {
          this.usuario = null;
          this.usuarioNoEncontrado = true;
        }
      },
      error: (err) => {
        console.error("Error al buscar usuario:", err);
        this.usuario = null;
        this.usuarioNoEncontrado = true;
      }
    });
  }

  ngOnInit():void{
    this.http.get(`${this.ROOT_URL}/users/1`).subscribe((userInfo:any)=>{
      this.usuario=userInfo;
    })
  }
}
