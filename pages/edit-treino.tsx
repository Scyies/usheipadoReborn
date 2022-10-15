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

export interface TreinoInput {
  name: string | undefined;
  reps: string | undefined;
  sets: string | undefined;
}

export default function EditTreino() {
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [editableTreino, setEditableTreino] = useState<Treino[]>([]);

  const setLoggedUser = useSetRecoilState(userId);

  const userIdValue = useRecoilValue(userId);

  const [inputFields, setInputFields] = useState<TreinoInput[]>([]);

  const [toggleEdit, setToggleEdit] = useState<number | null>(null);

  const [changeType, setChangeType] = useState<'edit' | 'delete' | ''>('');

  function handleFormChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let data: TreinoInput[] = [...inputFields];
    data[index][event.target.name as keyof TreinoInput] = event.target.value;
    setInputFields(data);
  }

  function addFieldsByTreinos(editableTreino: Treino[]) {
    let newField: TreinoInput[] = [];
    editableTreino.map((treino) => {
      let field = {
        name: treino.name,
        reps: treino.reps,
        sets: String(treino.sets),
        id: treino.id,
      };
      newField.push(field);
    });
    setInputFields(newField);
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
          name: inputFields[toggleEdit!].name,
          reps: inputFields[toggleEdit!].reps,
          sets: Number(inputFields[toggleEdit!].sets),
        })
        .match({
          id: editableTreino[toggleEdit!].id,
        })
        .select('*');

      if (data) {
        toast.success('Treino atualizado com sucesso!');
      }
      if (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    if (type === 'delete') {
      const { error } = await supabase
        .from('Treinos')
        .delete()
        .eq('id', editableTreino[toggleEdit!].id);
      toast.success('Treino excluído com sucesso!');
      if (error) {
        toast.error(error.message);
      }
    }
  }

  function toggleEditor(index: number) {
    if (toggleEdit === null) {
      setToggleEdit(index);
    } else {
      setToggleEdit(null);
    }
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
  }, []);
  useEffect(() => {
    fetchTreinosByDia(setEditableTreino, selectRecoilValue, userIdValue);
  }, [selectRecoilValue, userIdValue]);
  useEffect(() => {
    addFieldsByTreinos(editableTreino);
  }, [editableTreino]);
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
            inputFields.map((input, index) => (
              <div
                key={index}
                className='max-w-[300px] md:max-w-md lg:max-w-lg w-full overflow-hidden'
              >
                <TreinoCard
                  editState={toggleEdit}
                  edittor={toggleEditor}
                  index={index}
                  treino={input?.name!}
                />
                {toggleEdit == index && (
                  <EditCard
                    index={index}
                    input={input}
                    setValue={handleFormChange}
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
