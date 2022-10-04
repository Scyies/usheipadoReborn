import { Volume } from "./fetchVolumeByTreino";

export function averageVol(volumeData: Volume[]) {
  const volArr: number[] = []
  const length = volumeData.length
  volumeData.map((item) => {
    const vol = item.vol;
    volArr.push(vol);
  })

  const sum = volArr.length > 0 && volArr.reduce((accumulator, value) => {
    return accumulator + value
  })
  return Math.round(Number(sum) / length)
}