import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dias } from '.';
import { diasSelectState, userId } from '../atom/atom';
import Button from '../components/Button';
import { Input } from '../components/Input';
import Select from '../components/Select';
import { fetchDiasData } from '../utils/fetchDias';
import {
  fetchTreinosByDia,
  fetchTreinosNameByDia,
  Treino,
} from '../utils/fetchTreinosByDia';
import { supabase } from '../supa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TreinoInput } from './edit-treino';
import { TreinoCard } from '../components/TreinoCard';
import { SelectValue } from '@radix-ui/react-select';
import { NewVolumeCard } from '../components/NewVolumeCard';

export interface VolumeInput {
  nome: string;
  peso: string;
  reps: string;
  sets: string;
  dia: Date | null | string;
  id: string;
}

export default function Volume() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);

  const [diasData, setDiasData] = useState<Dias[]>([]);

  const setLoggedUser = useSetRecoilState(userId);

  const userIdValue = useRecoilValue(userId);

  const [treinosList, setTreinosList] = useState<Treino[]>([]);

  const [inputFields, setInputFields] = useState<VolumeInput[]>([]);

  const [toggleEdit, setToggleEdit] = useState<number | null>(null);

  function handleFormChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let data: VolumeInput[] = [...inputFields];
    data[index][event.target.name as keyof VolumeInput] = event.target.value;
    setInputFields(data);
  }

  function addFieldsByTreinos(treinosList: Treino[]) {
    let newField: VolumeInput[] = [];
    treinosList.map((treino) => {
      let field = {
        nome: treino.name,
        peso: '',
        reps: '',
        sets: '',
        dia: null,
        id: treino.id!,
      };
      newField.push(field);
    });
    setInputFields(newField);
  }

  function toggleEditor(index: number) {
    if (toggleEdit === null) {
      setToggleEdit(index);
    } else {
      setToggleEdit(null);
    }
  }

  console.log(inputFields);

  async function handleNovoVolume(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const input = Object.fromEntries(formData);

    const totalVolume =
      Number(inputFields[toggleEdit!].peso) *
      Number(inputFields[toggleEdit!].reps) *
      Number(inputFields[toggleEdit!].sets);

    const { data, error } = await supabase
      .from('Volumes')
      .insert([
        {
          vol: Math.round(totalVolume),
          dia: inputFields[toggleEdit!].dia,
          treinoId: inputFields[toggleEdit!].id,
        },
      ])
      .select('*');

    if (data) {
      toast.success('Volume adicionado com sucesso!');
    }
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
    const userStorage = localStorage.getItem('token');
    userStorage && setLoggedUser(userStorage!);
  }, [selectRecoilValue]);
  useEffect(() => {
    fetchTreinosByDia(setTreinosList, selectRecoilValue, userIdValue);
  }, [selectRecoilValue, userIdValue]);
  useEffect(() => {
    addFieldsByTreinos(treinosList);
  }, [treinosList]);
  return (
    <>
      <Header />
      <main className='mx-auto mt-8 flex min-h-[calc(100vh-62px)] max-w-xs flex-col'>
        <h1 className='text-center text-white-200 text-xs mb-4'>
          Selecione o dia da semana!
        </h1>
        <div className='self-center'>
          <Select
            selectData={diasData}
            defaultOptionValue='D. Semana'
            value={selectRecoilValue}
            onValueChange={setDiasSelect}
            selectedValue={selectRecoilValue}
          />
        </div>
        <form
          onSubmit={handleNovoVolume}
          className='my-8 flex flex-col gap-4 items-center'
        >
          {selectRecoilValue.length > 0 &&
            inputFields.map((input, index) => (
              <div key={index} className='max-w-[300px] w-full overflow-hidden'>
                <TreinoCard
                  editState={toggleEdit}
                  edittor={toggleEditor}
                  index={index}
                  treino={input?.nome!}
                />
                {toggleEdit == index && (
                  <NewVolumeCard
                    index={index}
                    input={input}
                    setValue={handleFormChange}
                  />
                )}
              </div>
            ))}
          <div className='mb-8'></div>
          <Button type='submit'>Adicionar</Button>
        </form>
      </main>
      <Footer />
    </>
  );
}
