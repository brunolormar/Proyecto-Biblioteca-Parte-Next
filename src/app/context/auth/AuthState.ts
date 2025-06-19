import { IUser } from '@/interfaces/IUser';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}