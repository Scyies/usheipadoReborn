import React, { useEffect, useState } from 'react';
import { diasSelectState, treinosList } from '../atom/atom';
import { Dias } from '../pages';
import Select from './Select';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { fetchTreinosByDia, Treino } from '../utils/fetchTreinosByDia';
import { fetchDiasData } from '../utils/fetchDias';
import { filteredTreinos } from '../atom/selectors';
import { setTodaysDate } from '../utils/setTodaysDate';
import { useGetUser } from '../hooks/useGetUser';

export default function Table() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const setTreinos = useSetRecoilState(treinosList);
  const treinosLista = useRecoilValue(filteredTreinos);
  const { userInfo } = useGetUser();

  const currentUserId = userInfo?.user.id;

  useEffect(() => {
    fetchDiasData(setDiasData);
    setTodaysDate(setDiasSelect);
  }, []);
  useEffect(() => {
    if (currentUserId) {
      fetchTreinosByDia(setTreinos, currentUserId);
    }
  }, [setTreinos, currentUserId]);
  return (
    <>
      <div className='self-center'>
        <Select
          selectData={diasData}
          defaultOptionValue='D. Semana'
          value={selectRecoilValue}
          onValueChange={setDiasSelect}
          selectedValue={selectRecoilValue}
        />
      </div>
      <table className='rounded bg-gray-500 text-white-200 border-separate border-gray-300 my-8'>
        <thead className='text-center'>
          <tr className='font-semibold '>
            <td className='border-r border-gray-300 px-4 py-3'>Treino</td>
            <td className='border-r border-gray-300 px-4 py-3'>Séries</td>
            <td className='px-4 py-3'>Repetições</td>
          </tr>
        </thead>
        <tbody className='text-center bg-gray-700 text-xs'>
          {treinosLista &&
            treinosLista.map((treino: Treino) => (
              <tr key={treino.id}>
                <td className='border-r border-gray-300 border-t py-3'>
                  {treino.name}
                </td>
                <td className='border-r border-gray-300 border-t'>
                  {treino.sets}
                </td>
                <td className='border-t border-gray-300'>{treino.reps}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
