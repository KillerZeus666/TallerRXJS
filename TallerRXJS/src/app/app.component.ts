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
  ROOT_URL = "https://dummyjson.com";

  // Para Realizar Peticiones HTTP
  constructor(private http: HttpClient) {}
  
  // 1. Crear un Observable
  // user$: Observable<any> = new Observable();

  usuario: User | null = null;

  // Declaramos la variable para almacenar el usuario
  txUser: string = "";

  searchUser() {
    // Verifica que txUser no esté vacío
    if (!this.txUser.trim()) {
      console.warn("El campo de búsqueda está vacío.");
      this.usuario = null;
      return;
    }

    this.http.get<any>(`${this.ROOT_URL}/users/search?q=${this.txUser}`).subscribe({
      next: (userInfo) => {
        if (userInfo.users && userInfo.users.length > 0) {
          this.usuario = userInfo.users[0]; // Obtiene el primer usuario de la lista
        } else {
          this.usuario = null;
          console.warn("Usuario no encontrado.");
        }
      },
      error: (err) => {
        console.error("Error al buscar usuario:", err);
        this.usuario = null;
      }
    });
  }
}
