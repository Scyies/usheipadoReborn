import React, { useEffect, useState } from 'react';
import { diasSelectState } from '../atom/atom';
import Select from '../components/Select';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { fetchDiasData } from '../utils/fetchDias';
import { Dias } from '.';
import Button from '../components/Button';
import { Input } from '../components/Input';
import { supabase } from '../supa';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Loading } from '../components/Loading';
import { useGetUser } from '../hooks/useGetUser';
import { useRouter } from 'next/router';

export default function NovoTreino() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const { userInfo } = useGetUser();
  const userIdValue = userInfo?.user.id;
  const [newTreinoInputs, setNewTreinoInputs] = useState({
    name: '',
    reps: '',
    sets: '',
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTreinoInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleNovoTreino(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    if (
      !newTreinoInputs.name ||
      !newTreinoInputs.reps ||
      !newTreinoInputs.sets ||
      !selectRecoilValue ||
      !userIdValue
    ) {
      toast.error('Favor preencher todos os campos!');
      return;
    }

    const { data, error } = await supabase
      .from('Treinos')
      .insert([
        {
          name: newTreinoInputs.name,
          reps: newTreinoInputs.reps,
          sets: Number(newTreinoInputs.sets),
          diasId: selectRecoilValue,
          user_id: userIdValue,
        },
      ])
      .select('*');

    if (error) {
      toast.error('Ocorreu um erro inesperado');
      console.log(error);
      setIsLoading(false);
      return;
    }
    if (data) {
      setNewTreinoInputs(() => ({ name: '', reps: '', sets: '' }));
      toast.success('Treino adicionado com sucesso!');
      setIsLoading(false);
      return;
    }
  }

  return (
    <>
      <Header />
      <section className='mx-auto min-h-[calc(100vh-170px)] w-full max-w-xs md:max-w-md lg:max-w-lg'>
        <form
          onSubmit={handleNovoTreino}
          className='max-w-xs md:max-w-md lg:max-w-lg mx-auto mt-8 flex justify-center flex-col w-full'
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
              value={newTreinoInputs.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col mt-8 gap-2'>
            <label htmlFor='' className='text-white-200 text-xs'>
              Repetições
            </label>
            <Input
              placeholder='Ex: 8-10'
              name='reps'
              autoComplete='off'
              value={newTreinoInputs.reps}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col mt-8 mb-8 gap-2'>
            <label htmlFor='' className='text-white-200 text-xs'>
              Séries
            </label>
            <Input
              placeholder='Ex: 4'
              name='sets'
              autoComplete='off'
              value={newTreinoInputs.sets}
              onChange={handleInputChange}
              type='number'
            />
          </div>
          <div className='self-center mb-4'>
            <Button type='submit'>
              {!isLoading ? 'Adicionar' : <Loading />}
            </Button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}
