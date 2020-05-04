import { User } from './user.model';
export class Company {

  public naziv: string = null;
  public pib: number = null;
  public tekuciRacun: string = null;

  constructor(
    public user: User
  ) {}

}
