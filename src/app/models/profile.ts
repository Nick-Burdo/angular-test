import { Token } from './token';

export class Profile {
  id: number;
  username: string;
  password: string;
  country: string;
  city: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  lat: string;
  lon: string;
  gender: string;
  created_at: 0;
  updated_at: 0;
  accessToken: Token;
}
