import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from './models/User';
import { Post } from './models/Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TallerRXJS';
  usuarioNoEncontrado: boolean = false;

  ROOT_URL = "https://dummyjson.com";

  usuario: User | null = null;
  publicacion: Post | null = null;
  txUser: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${this.ROOT_URL}/users/1`).subscribe((userInfo: any) => {
      this.usuario = userInfo;
    });
  }

  searchUser() {
    // Si el campo de búsqueda está vacío, no realiza la consulta
    if (!this.txUser.trim()) {
      console.warn("El campo de búsqueda está vacío.");
      this.usuario = null;
      this.usuarioNoEncontrado = false;
      return;
    }

    // Realiza la petición HTTP para buscar un usuario por nombre de usuario
    this.http.get<any>(`${this.ROOT_URL}/users/search?q=${this.txUser}`).subscribe({
      next: (userInfo) => {
        // Verifica si se encontraron usuarios
        if (userInfo.users && userInfo.users.length > 0) {
          this.usuario = userInfo.users[0]; // Toma el primer usuario encontrado
          this.usuarioNoEncontrado = false;

          // Llama a getUserAndPost() para obtener el post del usuario
          this.getUserAndPost();
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

  getPost(id: number) {
    this.http.get<any>(`${this.ROOT_URL}/posts/user/${id}`).subscribe(
      (postInfo: any) => {
        this.publicacion = postInfo.posts.length > 0 ? postInfo.posts[0] : null; // Toma el primer post o deja null si no hay
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }

  getUserAndPost() {
    this.http.get<any>(`${this.ROOT_URL}/users/search?q=${this.txUser}`)
      .pipe(
        mergeMap((userInfo: any) => {
          if (userInfo.users && userInfo.users.length > 0) {
            this.usuario = userInfo.users[0];
            this.usuarioNoEncontrado = false;
            return this.http.get<any>(`${this.ROOT_URL}/posts/user/${this.usuario!.id}`);
          } else {
            this.usuario = null;
            this.usuarioNoEncontrado = true;
            return of(null); // Retorna un observable vacío si no hay usuario
          }
        })
      )
      .subscribe((postInfo: any) => {
        this.publicacion = postInfo && postInfo.posts.length > 0 ? postInfo.posts[0] : null;
      });
  }
}
