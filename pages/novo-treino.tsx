import React, { useEffect, useState } from 'react';
import { diasSelectState, userId } from '../atom/atom';
import Select from '../components/Select';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { fetchDiasData } from '../utils/fetchDias';
import { Dias } from '.';
import Button from '../components/Button';
import { Input } from '../components/Input';
import { supabase } from '../supa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NovoTreino() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const userIdValue = useRecoilValue(userId);
  const router = useRouter();

  console.log(selectRecoilValue);

  async function handleNovoTreino(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const input = Object.fromEntries(formData);

    const treinoInput = {
      name: String(input.name),
      reps: String(input.reps),
      sets: Number(input.sets),
      diasId: String(selectRecoilValue),
      user_id: userIdValue,
    };

    if (
      !treinoInput.name ||
      !treinoInput.reps ||
      !treinoInput.sets ||
      !treinoInput.diasId ||
      !treinoInput.user_id
    ) {
      toast.error('Favor preencher todos os campos!');
      return;
    }

    const { data, error } = await supabase
      .from('Treinos')
      .insert([
        {
          name: treinoInput.name,
          reps: treinoInput.reps,
          sets: treinoInput.sets,
          diasId: treinoInput.diasId,
          user_id: treinoInput.user_id,
        },
      ])
      .select('*');

    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success('Treino adicionado com sucesso!');
    }
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
  }, []);
  return (
    <>
      <Header />
      <section className='mx-auto max-w-xs md:max-w-md lg:max-w-lg'>
        <form
          onSubmit={handleNovoTreino}
          className='max-w-xs mx-auto mt-8 flex justify-center flex-col w-full'
        >
          <div className='self-center mb-8'>
            <Select
              selectData={diasData}
              defaultOptionValue='D. Semana'
              value={selectRecoilValue}
              onValueChange={setDiasSelect}
              selectedValue={selectRecoilValue}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='' className='text-white-200 text-xs'>
              Movimento
            </label>
            <Input
              placeholder='Ex: Barra fixa'
              name='name'
              autoComplete='off'
            />
          </div>
          <div className='flex flex-col mt-8 gap-2'>
            <label htmlFor='' className='text-white-200 text-xs'>
              Repetições
            </label>
            <Input placeholder='Ex: 8-10' name='reps' autoComplete='off' />
          </div>
          <div className='flex flex-col mt-8 mb-8 gap-2'>
            <label htmlFor='' className='text-white-200 text-xs'>
              Séries
            </label>
            <Input placeholder='Ex: 4' name='sets' autoComplete='off' />
          </div>
          <div className='self-center mb-4'>
            <Button type='submit'>Adicionar</Button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}
