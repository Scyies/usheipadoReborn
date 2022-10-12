import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dias } from '..';
import { diasSelectState, userId } from '../../atom/atom';
import Button from '../../components/Button';
import EditRow from '../../components/EditRow';
import Select from '../../components/Select';
import { fetchDiasData } from '../../utils/fetchDias';
import { fetchTreinosByDia, Treino } from '../../utils/fetchTreinosByDia';
import { supabase } from '../../supa';
import edit from '../../assets/edit.svg';
import Image from 'next/image';
import classNames from 'classnames';
import { toast } from 'react-toastify';

interface TreinoInput {
  name: string | undefined;
  reps: string | undefined;
  sets: string | undefined;
}

interface TreinoState {
  TreinoInput: TreinoInput;
}

export default function EditTreino() {
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [editableTreino, setEditableTreino] = useState<Treino[]>([]);

  const userIdValue = useRecoilValue(userId);

  const [inputFields, setInputFields] = useState<TreinoInput[]>([]);

  const [toggleEdit, setToggleEdit] = useState<number | null>(null);

  function handleFormChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let data: TreinoInput[] = [...inputFields];
    data[index][event.target.name as keyof TreinoInput] = event.target.value;
    setInputFields(data);
  }

  // function handleFormChange(event) {
  //   const value = event.target.value;
  //   setInputFields([...editableTreino, event.target.name: value])
  // }

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

  async function handleTreinoUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (toggleEdit == null) {
      toast.error('Favor selecionar o campo a ser alterado!');
      return;
    }

    try {
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
    } catch (error) {
      console.log(error);
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
    <main className='mx-6 mt-8 flex flex-col items-center'>
      <Select
        selectData={diasData}
        defaultOptionValue='D. Semana'
        onChange={(e) => setDiasSelect(e.target.value)}
        value={selectRecoilValue}
      />
      <form
        className='my-8 flex flex-col items-center'
        onSubmit={handleTreinoUpdate}
      >
        {selectRecoilValue.length > 0 &&
          inputFields.map((input, index) => (
            <div
              className={classNames(
                'grid grid-cols-6 gap-4 mb-8 items-center p-1',
                {
                  'bg-black/30 rounded-full': toggleEdit == index,
                }
              )}
              key={index}
            >
              <input
                className='col-span-2 bg-black text-white rounded-full px-4 py-2 text-center'
                placeholder={input.name}
                name='name'
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                className='bg-black text-white rounded-full px-4 py-2 text-center col-span-2'
                placeholder={input.reps}
                name='reps'
                value={input.reps}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                className='bg-black text-white rounded-full px-4 py-2 text-center'
                placeholder={input.sets}
                name='sets'
                value={input.sets}
                onChange={(event) => handleFormChange(index, event)}
              />
              <span
                onClick={() => toggleEditor(index)}
                className={classNames(
                  'text-white h-[30px] w-[30px] hover:bg-black/30 rounded-full p-1 mx-auto',
                  {
                    'bg-black/30 rounded-full': toggleEdit == index,
                  }
                )}
              >
                <Image src={edit} alt='' />
              </span>
            </div>
          ))}

        <Button type='submit'>Salvar</Button>
      </form>
    </main>
  );
}
