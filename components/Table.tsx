import React, { useEffect, useState } from "react";
import { diasSelectState } from "../atom/atom";
import { Dias } from "../pages";
import Select from "./Select";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { fetchTreinosByDia, Treino } from "../utils/fetchTreinosByDia";
import { fetchDiasData } from "../utils/fetchDias";

interface Props {
  diasData: Dias[]
}

export default function Table() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [tableTreinos, setTableTreinos] = useState<Treino[]>([])
  const [diasData, setDiasData] = useState<Dias[]>([]);

  console.log(tableTreinos);

  useEffect(() => {
    fetchTreinosByDia(setTableTreinos, selectRecoilValue)
    fetchDiasData(setDiasData);
  }, [selectRecoilValue])
  return (
    <>
      <div className="self-center mb-8">
        <Select
          selectData={diasData}
          defaultOptionValue="D. Semana"
          onChange={(e) => setDiasSelect(e.target.value)}
          value={selectRecoilValue}
        />
      </div>
      <table className="rounded-2xl bg-black text-white border-separate">
        <thead className="text-center">
          <tr className="font-bold ">
            <td className="border-r-2">Treino</td>
            <td className="border-r-2">Sets</td>
            <td className="">Reps</td>
          </tr>
        </thead>
        <tbody className="text-center">
          {tableTreinos &&
            tableTreinos.map((treino: Treino) => (
              <tr key={treino.id}>
                <td className="border-r-2 border-t-2">{treino.name}</td>
                <td className="border-r-2 border-t-2">{treino.sets}</td>
                <td className="border-t-2">{treino.reps}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
