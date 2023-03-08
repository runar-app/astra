export interface AudioBook {
  _id: string;

  // Name of the book
  title: string;

  // mp3 file url
  audioUrl: string;

  // Duration of the book in seconds
  duration: number;

  // Cover image url
  coverImgUrl: string;

  // Description of the Book: Norwegian fairy tales, Finnish fairy tales, etc.
  category: string;

  // Author of the voice acting: Alexander Sparrow, AI, etc.
  author: string;

  // Language of the book: en, ru, etc.
  language: string;
}
