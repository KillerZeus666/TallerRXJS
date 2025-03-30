import { User } from "./User";

export interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
  }
  