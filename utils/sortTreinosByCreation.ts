import { Treino } from './fetchTreinosByDia';

export function sortTreinoByCreation(tableTreinos: Treino[]) {
  const sortedArr: Treino[] = [];
  tableTreinos.map((treino) => {
    const date = new Date(treino.created_at!);

    sortedArr.push({
      name: treino.name,
      reps: treino.reps,
      sets: treino.sets,
      id: treino.id,
      created_at: date,
      diasId: treino.diasId,
    });
  });
  const treinoSorteado = sortedArr.sort(
    (objA, objB) => Number(objA.created_at) - Number(objB.created_at)
  );
  return treinoSorteado;
}
