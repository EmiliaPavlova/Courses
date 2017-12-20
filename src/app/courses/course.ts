export interface ICourse {
  id: number;
  name: string;
  duration: number;
  topRated: boolean;
  date: string;
  description: string;
}

export class Course implements ICourse {
  constructor(
    public id: number,
    public name: string,
    public duration: number,
    public topRated: boolean,
    public date: string,
    public description: string
  ) { }
}
