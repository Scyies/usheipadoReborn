import { atom } from 'recoil';
import { v4 } from 'uuid';

export interface IToken {
  session: {
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: {
      aud: string;
      email: string;
      id: string;
      role: string;
    };
  };
}

export const diasSelectState = atom<string>({
  key: v4(),
  default: '',
});

export const userId = atom<string>({
  key: v4(),
  default: '',
});
