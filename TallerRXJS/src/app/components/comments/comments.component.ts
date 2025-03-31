import { Component, Input } from '@angular/core';
import { Comment } from '../../models/Comment';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() comentarios: Comment[] = [];
  @Input() publicacion: Post | null = null;
  @Input() usuarioNoEncontrado: boolean = false;
}