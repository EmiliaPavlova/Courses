export interface ICourse {
  id: number;
  name: string;
  duration: number;
  date: Date;
  description: string;
}

export class Course implements ICourse {
  constructor(
    public id: number,
    public name: string,
    public duration: number,
    public date: Date,
    public description: string
  ) {}
}