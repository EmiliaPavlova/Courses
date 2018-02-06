import { Author } from './author';

export interface Course {
  id: number;
  name: string;
  duration: number;
  topRated: boolean;
  date: string;
  description: string;
  authors: Array<Author>;
}

export class Course implements Course {
  constructor(
    public id: number,
    public name: string,
    public duration: number,
    public topRated: boolean,
    public date: string,
    public description: string,
    public authors: Array<Author>
  ) { }
}
