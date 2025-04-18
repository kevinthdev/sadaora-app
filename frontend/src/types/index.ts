import { RouteProps } from 'react-router-dom';

export type IRoute = RouteProps & {
  name: string;
  isPrivate?: boolean;
}

export interface IUser {
  id: string;
  name?: string;
  headline?: string;
  bio?: string;
  photo?: string;
  interests?: string;
}

export interface IProfile {
  name?: string;
  headline?: string;
  bio?: string;
  photo?: string;
  interests?: string;
}
