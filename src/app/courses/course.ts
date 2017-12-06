export interface ICourse {
  id: number;
  name: string;
  duration: number;
  date: string;
  description: string;
}

export class Course implements ICourse {
  constructor(
    public id: number,
    public name: string,
    public duration: number,
    public date: string,
    public description: string
  ) {}
}