import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from '../../models/User';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';
import { forkJoin } from 'rxjs';

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
  publicaciones: Post[] = []; // Ahora almacena una lista de posts
  txUser: string = "";
  comentarios: { [postId: number]: Comment[] } = {}; // Comentarios organizados por post

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${this.ROOT_URL}/users/1`).subscribe((userInfo: any) => {
      this.usuario = userInfo;
    });
  }

  searchUser() {
    if (!this.txUser.trim()) {
      console.warn("El campo de búsqueda está vacío.");
      this.limpiarDatos();
      return;
    }
  
    this.http.get<any>(`${this.ROOT_URL}/users/search?q=${this.txUser}`).subscribe({
      next: (userInfo) => {
        if (userInfo.users && userInfo.users.length > 0) {
          this.usuario = userInfo.users[0];
          this.usuarioNoEncontrado = false;
          this.getUserAndPosts(); // Llamar la nueva versión del método
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
    this.publicaciones = [];
    this.comentarios = {};
    this.usuarioNoEncontrado = true;
  }  

  getUserAndPosts() {
    this.http.get<any>(`${this.ROOT_URL}/users/search?q=${this.txUser}`)
      .pipe(
        mergeMap((userInfo: any) => {
          if (userInfo.users && userInfo.users.length > 0) {
            this.usuario = userInfo.users[0];
            this.usuarioNoEncontrado = false;

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
            this.publicaciones = postInfo.posts;
            return this.obtenerComentariosDePosts(postInfo.posts);
          }
  
          this.publicaciones = [];
          this.comentarios = {};
          return of(null);
        })
      )
      .subscribe();
  }

  obtenerComentariosDePosts(posts: Post[]): Observable<any> {
    const requests = posts.map(post => 
      this.http.get<any>(`${this.ROOT_URL}/comments/post/${post.id}`)
    );
    return forkJoin(requests).pipe( // Ejecuta todas las solicitudes de comentarios en paralelo y espera hasta que todas finalicen.
      mergeMap((responses) => {
        responses.forEach((commentsInfo, index) => {
          this.comentarios[posts[index].id] = commentsInfo?.comments || [];
        });
        return of(responses);
      })
    );
  }
}
