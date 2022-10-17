import { selector } from 'recoil';
import { v4 } from 'uuid';
import { supabase } from '../supa';
import { Treino } from '../utils/fetchTreinosByDia';
import { sortTreinoByCreation } from '../utils/sortTreinosByCreation';
import {
  diasSelectState,
  treinosList,
  treinosSelectState,
  volumeList,
} from './atom';

interface NamesArr {
  name: string;
}

export const filteredTreinos = selector({
  key: v4(),
  get: ({ get }) => {
    const filter = get(diasSelectState);
    const allTreinos = get(treinosList);
    const treinosByDay = allTreinos.filter((treino) => {
      if (!filter) return true;
      const filteredByDay = treino.diasId === filter;
      return filteredByDay;
    });
    return treinosByDay;
  },
});

export const filteredVolume = selector({
  key: v4(),
  get: ({ get }) => {
    const filter = get(treinosSelectState);
    const allVolumes = get(volumeList);
    console.log(allVolumes);
    const volumesById = allVolumes.filter((vol) => {
      if (!filter) return true;
      console.log(filter);
      const filteredById = vol.treinoId === filter;
      return filteredById;
    });
    console.log(volumesById);
    return volumesById;
  },
});

export const treinosAsync = selector({
  key: v4(),
  get: async () => {
    const userId = localStorage.getItem('token');

    const { data, error } = await supabase
      .from('Treinos')
      .select('name, sets, reps, id, created_at, diasId')
      .eq('user_id', userId);

    if (error) {
      return console.error(error);
    }
    const treinosList: Treino[] = sortTreinoByCreation(data);
    return treinosList;
  },
});
