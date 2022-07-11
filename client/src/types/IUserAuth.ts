export interface ILoggedInUser {
    token: string,
    user: IUserData;
}

export interface IUserLogin {
    emailOrUsername: string;
    password: string;
}

export interface IBaseUser {
    username: string;
    email: string;
}

export interface IUser extends IBaseUser {
    password: string;
}

export interface IUserData extends IBaseUser{
  id: string;
}