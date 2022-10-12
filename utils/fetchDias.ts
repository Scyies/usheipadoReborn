import { Dispatch, SetStateAction } from 'react';
import { Dias } from '../pages';
import { supabase } from '../supa';

export async function fetchDiasData(setter: Dispatch<SetStateAction<Dias[]>>) {
  const { data, error } = await supabase.from('Dias').select('*');

  if (error) {
    console.log(error.message);
  }
  if (data) {
    setter(data);
  }
}
