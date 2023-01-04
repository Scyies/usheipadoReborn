import { ChangeEvent, useEffect, useState } from 'react';
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
import { fetchVolumeByTreino, Volume } from '../utils/fetchVolumeByTreino';
import { averageVol } from '../utils/averageVol';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { filteredTreinos, filteredVolume } from '../atom/selectors';
import { useGetUser } from '../hooks/useGetUser';
import { setTodaysDate } from '../utils/setTodaysDate';

export default function Charts() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const [radioFilter, setRadioFilter] = useState('volume');

  const setTreinoSelect = useSetRecoilState(treinosSelectState);

  const treinoSelect = useRecoilValue(treinosSelectState);

  const treinosLista = useRecoilValue(filteredTreinos);

  const setTreinos = useSetRecoilState(treinosList);

  const { userInfo } = useGetUser();
  const userIdValue = userInfo?.user.id;

  const setVolumeList = useSetRecoilState(volumeList);

  const volumesData = useRecoilValue(filteredVolume);

  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    setRadioFilter(event.target.value);
  }

  function maxWeight(volume: Volume[]) {
    let pesoArr: number[] = [];

    volume.map((vol) => {
      if (!vol.peso) return pesoArr.push(0);
      pesoArr.push(vol.peso);
    });

    const result = pesoArr.length > 0 ? pesoArr : [0];

    return Math.max(...result);
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
    setTodaysDate(setDiasSelect);
  }, []);

  useEffect(() => {
    if (userIdValue) {
      fetchTreinosByDia(setTreinos, userIdValue);
    }
  }, [setTreinos, userIdValue]);

  useEffect(() => {
    if (userIdValue) {
      fetchVolumeByTreino(setVolumeList, userIdValue);
    }
  }, [userIdValue]);

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
        <div className='flex gap-2 justify-center mb-8'>
          <label
            htmlFor='peso'
            className='flex gap-2 text-white-200 place-items-center p-2'
          >
            <span className='bg-gray-500 h-4 w-4 rounded-full relative'>
              <span
                className={`bg-orange-500 h-2 w-2 rounded-full absolute inset-[4px] ${
                  radioFilter === 'peso' ? 'flex' : 'hidden'
                }`}
              ></span>
            </span>
            <input
              type='radio'
              name='peso'
              id='peso'
              className='cursor-pointer hidden'
              value='peso'
              checked={radioFilter === 'peso'}
              onChange={handleRadio}
            />
            Peso
          </label>
          <label
            htmlFor='volume'
            className='flex gap-2 text-white-200 place-items-center p-2'
          >
            <span className='bg-gray-500 h-4 w-4 rounded-full relative'>
              <span
                className={`bg-orange-500 h-2 w-2 rounded-full absolute inset-[4px] ${
                  radioFilter === 'volume' ? 'flex' : 'hidden'
                }`}
              ></span>
            </span>
            <input
              type='radio'
              name='volume'
              id='volume'
              className='cursor-pointer hidden'
              value='volume'
              checked={radioFilter === 'volume'}
              onChange={handleRadio}
            />
            Volume
          </label>
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
                dataKey={`${radioFilter === 'volume' ? 'vol' : 'peso'}`}
                stroke='#35353A'
                fill='#e44c2e'
              />
              <XAxis dataKey='dia' stroke='#ededed' />
              <YAxis stroke='#ededed' />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <section className='flex flex-col gap-2 my-8'>
          <div className='grid grid-cols-2 items-center gap-4'>
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
          <div className='grid grid-cols-2 items-center gap-4'>
            <label
              htmlFor=''
              className='text-white-200 font-semibold text-center select-none'
            >
              Carga máxima
            </label>
            <div className='bg-orange-500 text-gray-900 rounded w-full h-full px-4 py-3 text-center font-semibold'>
              <p>{maxWeight(volumesData)}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
