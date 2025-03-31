import { Component, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { User } from '../../models/User';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  @Input() publicacion: Post | null = null;
  @Input() usuario: User | null = null; // Necesario para la condición *ngIf en el HTML
}