
export class User {
  public slika: string = null;
  public adresa: string = null;
  public grad: string = null;
  public post: string = null;
  public telefon: number = null;


  constructor(
    public email: string,
    public localId: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // Podaci vezani za validaciju
  get token() {
    if (!this._tokenExpirationDate && new Date() > this._tokenExpirationDate ) {
      return null;
    }
    return this._token;
  }

}
