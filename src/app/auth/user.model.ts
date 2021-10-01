export class User{
  
  constructor( 
    public email: string,
    public id: string,
    private _token : string,
    private _tokenExpirationDate: Date,
    private _refreshToken: string
  ){}

    get token(){
        if(!this._tokenExpirationDate){
            return null;
        } 
        return this._token;
    }
    get tokenExpirationDate(){
      if(!this._tokenExpirationDate ){
          return null;
      } 
      return this._tokenExpirationDate;
  }
}