import { Treino } from './fetchTreinosByDia';

export function removeFromArrayById(arr: Treino[], id: string) {
  const objToRemove = arr.findIndex((obj) => obj.id === id);
  arr.splice(objToRemove, 1);
  return arr;
}
