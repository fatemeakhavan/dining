import { ERoles } from 'Enums/App.enums';

export interface IUser {
  cascadeGroupAccess: boolean;
  client_id: string;
  members?: IUserInfo[];
  name: ERoles;
  path: ERoles;
}

export interface IGroupUser {
  ssoId: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
}

export interface IUserInfo {
  email_verified: boolean;
  family_name: string;
  given_name: string;
  id: number;
  nationalcode_verified: boolean;
  phone_number_verified: boolean;
  picture: string;
  preferred_username: string;
  role?: ERoles;
}
