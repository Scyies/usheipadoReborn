import { useEffect, useState } from 'react';
import { Dias } from '.';
import {
  diasSelectState,
  treinosList,
  treinosSelectState,
  volumeList,
} from '../atom/atom';
import Select from '../components/Select';
import { fetchTreinosByDia } from '../utils/fetchTreinosByDia';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchDiasData } from '../utils/fetchDias';
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { fetchVolumeByTreino } from '../utils/fetchVolumeByTreino';
import { averageVol } from '../utils/averageVol';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { filteredTreinos, filteredVolume } from '../atom/selectors';
import { useGetUser } from '../hooks/useGetUser';
import { useRouter } from 'next/router';

export default function Charts() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [diasData, setDiasData] = useState<Dias[]>([]);

  const setTreinoSelect = useSetRecoilState(treinosSelectState);

  const treinoSelect = useRecoilValue(treinosSelectState);

  const treinosLista = useRecoilValue(filteredTreinos);

  const setTreinos = useSetRecoilState(treinosList);

  const { userInfo } = useGetUser();
  const userIdValue = userInfo?.user.id;

  const setVolumeList = useSetRecoilState(volumeList);

  const volumesData = useRecoilValue(filteredVolume);

  const router = useRouter();

  useEffect(() => {
    fetchDiasData(setDiasData);
  }, []);

  useEffect(() => {
    if (userIdValue) {
      fetchTreinosByDia(setTreinos, userIdValue);
    }
  }, [setTreinos, userIdValue]);

  useEffect(() => {
    fetchVolumeByTreino(setVolumeList);
  }, []);

  return (
    <>
      <Header />
      <main className='mx-auto max-w-xs md:max-w-md lg:max-w-lg min-h-[calc(100vh-170px)]'>
        <h1 className='text-white-200 text-xs text-center mt-4 select-none'>
          Selecione o dia e o treino que quer ver o volume utilizado!
        </h1>
        <div className='flex justify-between my-8'>
          <Select
            selectData={diasData}
            defaultOptionValue='D. Semana'
            value={selectRecoilValue}
            onValueChange={setDiasSelect}
            selectedValue={selectRecoilValue}
          />
          <Select
            selectData={treinosLista}
            defaultOptionValue='Treino'
            value={treinoSelect}
            onValueChange={setTreinoSelect}
            selectedValue={treinoSelect}
          />
        </div>
        <div className='bg-gray-700 rounded overflow-hidden flex justify-center text-black h-[200px] w-[100%]'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              width={900}
              height={200}
              data={volumesData}
              margin={{
                top: 24,
                right: 24,
                bottom: 8,
              }}
            >
              <Area
                type='monotone'
                dataKey='vol'
                stroke='#35353A'
                fill='#e44c2e'
              />
              <XAxis dataKey='dia' stroke='#ededed' />
              <YAxis stroke='#ededed' />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <section className='my-8'>
          <div className='flex items-center gap-4'>
            <label
              htmlFor=''
              className='text-white-200 font-semibold text-center select-none'
            >
              Média de volume
            </label>
            <div className='bg-orange-500 text-gray-900 rounded w-full h-full px-4 py-3 text-center font-semibold'>
              <p>{averageVol(volumesData)}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
