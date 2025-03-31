import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from './models/User';
import { Post } from './models/Post';
import { Comment } from './models/Comment';

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
  comentarios: Comment[] = [];

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
      this.limpiarDatos();
      return;
    }
  
    this.http.get<any>(`${this.ROOT_URL}/users/search?q=${this.txUser}`).subscribe({
      next: (userInfo) => {
        // Verifica si se encontraron usuarios
        if (userInfo.users && userInfo.users.length > 0) {
          this.usuario = userInfo.users[0];
          this.usuarioNoEncontrado = false;

          // Llama a getUserAndPost() para obtener el post del usuario
          this.getUserAndPost();
        } else {
          this.limpiarDatos();
        }
      },
      error: (err) => {
        console.error("Error al buscar usuario:", err);
        this.limpiarDatos();
      }
    });
  }
  
  private limpiarDatos() {
    this.usuario = null;
    this.publicacion = null;
    this.comentarios = [];
    this.usuarioNoEncontrado = true;
  }  

  getPost(id: number) {
    this.http.get<any>(`${this.ROOT_URL}/posts/user/${id}`).subscribe(
      (postInfo: any) => {
        if (postInfo.posts && postInfo.posts.length > 0) {
          this.publicacion = postInfo.posts[0];
  
          // Verificación explícita antes de hacer la petición de comentarios
          if (this.publicacion && this.publicacion.id) {
            this.http.get<any>(`${this.ROOT_URL}/comments/post/${this.publicacion.id}`).subscribe(
              (commentsInfo: any) => {
                this.comentarios = commentsInfo.comments || [];
              },
              (error) => {
                console.error('Error al obtener los comentarios:', error);
              }
            );
          } else {
            this.comentarios = []; // Limpiar comentarios si no hay publicación válida
          }
        } else {
          this.publicacion = null;
          this.comentarios = []; // Limpiar comentarios si no hay posts
        }
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
  
            // Verificación explícita antes de acceder a id
            if (this.usuario?.id) {
              return this.http.get<any>(`${this.ROOT_URL}/posts/user/${this.usuario.id}`);
            }
          } 
  
          this.usuario = null;
          this.usuarioNoEncontrado = true;
          return of(null);
        }),
        mergeMap((postInfo: any) => {
          if (postInfo && postInfo.posts.length > 0) {
            this.publicacion = postInfo.posts[0];
  
            // Verificación antes de acceder a id
            if (this.publicacion?.id) {
              return this.http.get<any>(`${this.ROOT_URL}/comments/post/${this.publicacion.id}`);
            }
          }
  
          this.publicacion = null;
          this.comentarios = [];
          return of(null);
        })
      )
      .subscribe((commentsInfo: any) => {
        this.comentarios = commentsInfo?.comments || [];
      });
  }
}