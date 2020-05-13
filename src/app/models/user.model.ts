
export class User {

  public details: {
    profile_image: string;
    address: string;
    city: string;
    zip_code: string;
    phone_number: string;
    account_type: string;
    // User
    first_name?: string;
    last_name?: string;
    date_of_birth?: Date;

    // Company
    company_name?: string;
    pib?: string;
    fax?: string;
  } = null;

  constructor(
    public email: string,
    public localId: string,
    public isAdministrator: boolean,
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
