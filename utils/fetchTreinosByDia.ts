import { Dispatch, SetStateAction } from 'react';
import { Dias } from '../pages';
import { supabase } from '../supa';
import { sortTreinoByCreation } from './sortTreinosByCreation';

export interface Treino {
  id?: string;
  name: string;
  reps?: string;
  sets?: number;
  diasId?: string;
  created_at?: string | Date;
}

interface TreinoDataProps {
  setter: Dispatch<SetStateAction<Treino[]>>;
  diasId: string;
}

export async function fetchTreinosByDia(
  setter: Dispatch<SetStateAction<Treino[]>>,
  diasId: string,
  userId: string
) {
  const { data, error } = await supabase
    .from('Treinos')
    .select('name, sets, reps, id, created_at')
    .eq('diasId', diasId)
    .eq('user_id', userId);

  if (error) {
    console.log(error.message);
  }
  if (data) {
    setter(sortTreinoByCreation(data));
  }
}

export async function fetchTreinosNameByDia(
  setter: Dispatch<SetStateAction<Treino[]>>,
  diasId: string
) {
  const { data, error } = await supabase
    .from('Treinos')
    .select('name, id')
    .eq('diasId', diasId);

  if (error) {
    console.log(error.message);
  }
  if (data) {
    setter(data);
  }
}
