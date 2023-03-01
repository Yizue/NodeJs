//-------------------------------------------------
// src/user-service.ts
//-------------------------------------------------
export class UserService{
    constructor(){}
    public getUsers(): any[]{
      return [{
        'name': 'admin'
      }];
    }
  }