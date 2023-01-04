import { Dispatch, SetStateAction } from 'react';
import { supabase } from '../supa';
import { formatDate, sortArrayByDia } from './formataDataVolume';

export interface Volume {
  id?: string;
  vol: number;
  dia: string | Date;
  treinoId: string;
  peso?: number;
  reps?: number;
  sets?: number;
}

export async function fetchVolumeByTreino(
  setter: Dispatch<SetStateAction<Volume[]>>,
  userId: string
) {
  const { data, error } = await supabase
    .from('Volumes')
    .select('vol, dia, id, treinoId, peso, reps, sets')
    .eq('userId', userId);

  if (error) {
    console.log(error);
  }
  if (data) {
    const sortedData = sortArrayByDia(data);
    const dataFormatada = formatDate(sortedData);
    setter(dataFormatada);
  }
}
