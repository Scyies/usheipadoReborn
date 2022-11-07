import { Session } from '@supabase/supabase-js';
import { atom } from 'recoil';
import { v4 } from 'uuid';
import { Treino } from '../utils/fetchTreinosByDia';
import { Volume } from '../utils/fetchVolumeByTreino';

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

export interface TreinoSelect {
  name: string;
  id: string;
}

export const diasSelectState = atom<string>({
  key: v4(),
  default: '',
});

export const treinosSelectState = atom<string>({
  key: v4(),
  default: '',
});

export const user = atom<Session | null>({
  key: v4(),
  default: null,
});

export const treinosList = atom<Treino[]>({
  key: v4(),
  default: [],
});

export const volumeList = atom<Volume[]>({
  key: v4(),
  default: [],
});
