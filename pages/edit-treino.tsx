import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dias } from '.';
import { diasSelectState, userId } from '../atom/atom';
import Select from '../components/Select';
import { fetchDiasData } from '../utils/fetchDias';
import { fetchTreinosByDia, Treino } from '../utils/fetchTreinosByDia';
import { supabase } from '../supa';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { EditCard } from '../components/EditCard';
import { TreinoCard } from '../components/TreinoCard';
import { removeFromArrayById } from '../utils/arraySpliceById';

export interface TreinoInput {
  id: string;
  name: string;
  reps: string;
  sets: string | number;
}

export default function EditTreino() {
  const [diasData, setDiasData] = useState<Dias[]>([]);

  const setDiasSelect = useSetRecoilState(diasSelectState);

  const selectRecoilValue = useRecoilValue(diasSelectState);

  const [treinosList, setTreinosList] = useState<Treino[]>([]);

  const userIdValue = useRecoilValue(userId);

  const [inputFields, setInputFields] = useState<TreinoInput>({
    name: '',
    reps: '',
    sets: '',
    id: '',
  });

  const [toggleEdit, setToggleEdit] = useState<string | null>(null);

  const [changeType, setChangeType] = useState<'edit' | 'delete' | ''>('');

  function addEditBoxFields(id: string) {
    const selectedTreino = treinosList.find((treino) => id === treino.id);
    setInputFields((prev) => ({
      ...prev,
      name: selectedTreino?.name!,
      reps: selectedTreino?.reps!,
      sets: Number(selectedTreino?.sets!),
      id: selectedTreino?.id!,
    }));
  }

  function handleFormInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleTreinoUpdate(
    event: React.FormEvent<HTMLFormElement>,
    type: string
  ) {
    event.preventDefault();

    if (toggleEdit == null) {
      toast.error('Favor selecionar o campo a ser alterado!');
      return;
    }

    if (type === 'edit') {
      const { data, error } = await supabase
        .from('Treinos')
        .update({
          name: inputFields.name,
          reps: inputFields.reps,
          sets: Number(inputFields.sets),
        })
        .match({
          id: inputFields.id,
        })
        .select('*');

      if (error) {
        console.error(error);
        return toast.error('Ocorreu um erro inesperado');
      }

      if (data) {
        return toast.success('Treino atualizado com sucesso!');
      }
    }

    if (type === 'delete') {
      const { error } = await supabase
        .from('Treinos')
        .delete()
        .eq('id', inputFields.id);
      if (error) {
        console.error(error);
        return toast.error('Não foi possível excluir o treino');
      }
      removeFromArrayById(treinosList, inputFields.id);
      toast.success('Treino excluído com sucesso!');
    }
  }

  function toggleEditor(id: string) {
    if (toggleEdit === null) {
      setToggleEdit(id);
      addEditBoxFields(id);
    } else {
      setToggleEdit(null);
    }
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
  }, []);
  useEffect(() => {
    fetchTreinosByDia(setTreinosList, selectRecoilValue, userIdValue);
  }, [selectRecoilValue, userIdValue]);
  return (
    <>
      <Header />
      <main className=' mx-auto max-w-xs md:max-w-md lg:max-w-lg mt-8 flex flex-col items-center min-h-[calc(100vh-170px)]'>
        <h1 className='text-white-200 text-xs mb-4'>
          Selecione o dia da semana!
        </h1>
        <Select
          selectData={diasData}
          defaultOptionValue='D. Semana'
          value={selectRecoilValue}
          onValueChange={setDiasSelect}
          selectedValue={selectRecoilValue}
        />
        <form
          className='my-8 w-full flex flex-col gap-4 items-center'
          onSubmit={(event) => handleTreinoUpdate(event, changeType)}
        >
          {selectRecoilValue.length > 0 &&
            treinosList.map((treino) => (
              <div
                key={treino.id}
                className='max-w-[300px] md:max-w-md lg:max-w-lg w-full overflow-hidden'
              >
                <TreinoCard
                  editState={toggleEdit}
                  edittor={toggleEditor}
                  id={treino.id!}
                  treino={treino?.name!}
                />
                {toggleEdit == treino.id && (
                  <EditCard
                    id={treino.id}
                    treino={treino}
                    setValue={handleFormInput}
                    mutationType={setChangeType}
                  />
                )}
              </div>
            ))}
        </form>
      </main>
      <Footer />
    </>
  );
}
