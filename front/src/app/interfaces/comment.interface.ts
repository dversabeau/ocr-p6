export interface Comment {
  id_comment?: number;
  id_user?: number;
  id_post: number;
  author: string;
  content: string;
  created_at: Date;
}
