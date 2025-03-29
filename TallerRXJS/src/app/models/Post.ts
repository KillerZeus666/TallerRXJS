export interface Post {
    id: number;
    title: string;
    body: string;
    reactions: {
      likes: number;
      dislikes: number;
    };
    userId: number;
  }
  