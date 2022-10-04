import { useEffect, useState } from "react";
import { Dias } from "..";
import { diasSelectState } from "../../atom/atom";
import Select from "../../components/Select";
import { fetchTreinosNameByDia, Treino } from "../../utils/fetchTreinosByDia";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fetchDiasData } from "../../utils/fetchDias";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { fetchVolumeByTreino, Volume } from "../../utils/fetchVolumeByTreino";
import { averageVol } from "../../utils/averageVol";

export default function Charts() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const [treinoSelectState, setTreinoSelectState] = useState<Treino[]>([]);
  const [treinoSelect, setTreinoSelect] = useState<string>("");
  const [volumeData, setVolumeData] = useState<Volume[]>([]);
  
  useEffect(() => {
    fetchDiasData(setDiasData);
    if(selectRecoilValue.length > 0) {
      fetchTreinosNameByDia(setTreinoSelectState, selectRecoilValue);
    }
    if (treinoSelect.length > 0) {
      fetchVolumeByTreino(setVolumeData, treinoSelect);
    }
  }, [selectRecoilValue, treinoSelect]);
  return (
    <>
      <main className="mx-6">
        <div className="flex justify-between my-8">
          <Select
            defaultOptionValue="D. Semana"
            value={selectRecoilValue}
            selectData={diasData}
            onChange={(e) => setDiasSelect(e.target.value)}
          />
          <Select
            defaultOptionValue="Treino"
            selectData={treinoSelectState}
            value={treinoSelect}
            onChange={(e) => setTreinoSelect(e.target.value)}
          />
        </div>
        <div className="bg-black rounded-lg overflow-hidden flex justify-center text-black h-[200px] w-[100%]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={900}
              height={200}
              data={volumeData}
              margin={{
                top: 16,
                right: 16,
                bottom: 8,
              }}
            >
              <Area
                type="monotone"
                dataKey="vol"
                stroke="#252A34"
                fill="#FF2E63"
              />
              <XAxis dataKey="dia" stroke="#EAEAEA" />
              <YAxis stroke="#EAEAEA" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <section className="my-8">
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="" className="text-black font-bold text-center">Média</label>
            <div className='bg-black text-white rounded-full w-full h-full px-4 py-2 text-center'>
              <p>{averageVol(volumeData)}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
