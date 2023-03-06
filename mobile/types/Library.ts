export interface LibraryNode {
  _id: string;
  childIds: string[];
  imageUrl: string;
  linkUrl: string;
  linkTitle: string;
  title: string;
  content: string;
  sortOrder: number;
  type: string;
  tags: string[];
  audioUrl: string;
  audioDuration: number;
}
