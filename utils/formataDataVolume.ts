import { Volume } from './fetchVolumeByTreino';

interface VolumeTest {
  id?: string;
  vol: number;
  dia: string | Date;
  treinoId: string;
  peso?: number;
  reps?: number;
  sets?: number;
}

export function formatDate(volumeData: VolumeTest[]) {
  const dataArr: VolumeTest[] = [];
  volumeData.map((item) => {
    const date = new Date(item.dia);
    const vol: number = item.vol;

    const dia = date.toLocaleDateString('pt-BR');

    const pegaAno = dia.match(/(\d{4})/);

    const ano = pegaAno![0];

    const dateSemAno = dia.replace(`/${ano}`, '');

    dataArr.push({
      dia: dateSemAno,
      vol,
      id: item.id,
      treinoId: item.treinoId,
      peso: item.peso,
      reps: item.reps,
      sets: item.sets,
    });
  });
  return dataArr;
}

export function sortArrayByDia(volumeData: Volume[]) {
  const sortedArr: VolumeTest[] = [];
  volumeData.map((item) => {
    const date = new Date(item.dia);

    sortedArr.push({
      dia: date,
      vol: item.vol,
      id: item.id,
      treinoId: item.treinoId,
      peso: item.peso,
      reps: item.reps,
      sets: item.sets,
    });
  });
  const volumeSorteado = sortedArr.sort(
    (objA, objB) => Number(objA.dia) - Number(objB.dia)
  );
  return volumeSorteado;
}
