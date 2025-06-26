export interface IPost {
  id: string;
  title: string;
  image: string;
  description: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}