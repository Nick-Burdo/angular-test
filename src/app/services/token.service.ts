import { Injectable } from '@angular/core';
import { Token } from '../models/token';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  getToken(): Token | null {
    const tokenStorage = localStorage.getItem(TOKEN_KEY);
    if (tokenStorage) {
      return JSON.parse(tokenStorage);
    }
    return new Token();
  }

  setToken(data: Token) {
    if (data && data.token) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  getTokenValue(): string | null {
    const data = this.getToken();
    return data.token || null;
  }
}
