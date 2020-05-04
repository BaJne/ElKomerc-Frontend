import { User } from './user.model';

export class Person{

  public ime: string = null;
  public prezime: string = null;
  public datumRodjenja: Date = null;
  public administrator: boolean = null;

  constructor(
    public user: User
  ) {}
}
