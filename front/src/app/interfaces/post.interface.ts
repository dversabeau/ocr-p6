export interface Post {
  id_post?: number;
  id_user?: number;
  id_topic: number;
  author: string;
  topic: string;
  title: string;
  content: string;
  created_at: Date;
}
