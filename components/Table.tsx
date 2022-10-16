import React, { ChangeEvent, useEffect, useState } from 'react';
import { diasSelectState } from '../atom/atom';
import { Dias } from '../pages';
import Select from './Select';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { fetchTreinosByDia, Treino } from '../utils/fetchTreinosByDia';
import { fetchDiasData } from '../utils/fetchDias';
import { supabase } from '../supa';
import useGetUserInfo from '../utils/useGetUserInfo';
import { userId } from '../atom/atom';

interface Props {
  diasData: Dias[];
}

interface User {
  id: string;
  email: string;
  aud: string;
  role: string;
}

export default function Table() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [tableTreinos, setTableTreinos] = useState<Treino[]>([]);
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const userIdValue = useRecoilValue(userId);

  useEffect(() => {
    fetchDiasData(setDiasData);
  }, []);
  useEffect(() => {
    if (userIdValue) {
      fetchTreinosByDia(setTableTreinos, selectRecoilValue, userIdValue);
    }
  }, [selectRecoilValue, userIdValue]);
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
          {tableTreinos &&
            tableTreinos.map((treino: Treino) => (
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
