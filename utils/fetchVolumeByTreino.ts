import { Dispatch, SetStateAction } from "react";
import { supabase } from "../pages/supa";
import { formatDate, sortArrayByDia } from "./formataDataVolume";

export interface Volume {
  id?: string
  vol: number
  dia: string
}

export async function fetchVolumeByTreino(setter: Dispatch<SetStateAction<Volume[]>>, treinoId: string) {
  const { data, error } = await supabase
    .from("Volumes")
    .select("vol, dia, id")
    .eq("treinoId", treinoId);
  
  if (error) {
    console.log(error);
  }
  if (data) {
    const sortedData = sortArrayByDia(data)
    const dataFormatada = formatDate(sortedData)
    setter(dataFormatada)
  }
}
