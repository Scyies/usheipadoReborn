import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import {
  House,
  Barbell,
  ChartLine,
  PencilSimpleLine,
  Calculator,
  SignOut,
} from 'phosphor-react';
import Button from './Button';
import { supabase } from '../supa';
import { useRecoilValue } from 'recoil';
import { user } from '../atom/atom';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface SideProps {
  status: 'open' | 'closed';
}

export default function SideBar({ status }: SideProps) {
  const userInfo = useRecoilValue(user);
  const router = useRouter();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    toast.success('Usuário desconectado com sucesso!');
    router.push('/');
  }

  function logOut() {
    signOut();
  }

  return (
    <aside
      className={classNames(
        'fixed h-screen bg-gray-900 max-w-[220px] w-[50vw] right-0 px-6 transition-all z-50',
        {
          'translate-x-full': status === 'closed',
          'translate-x-0': status === 'open',
        }
      )}
    >
      <section className='flex flex-col justify-center text-center gap-4'>
        <Link
          href='/home'
          className='flex items-center justify-center gap-2 bg-orange-500 text-gray-900 rounded px-4 py-3 font-medium hover:bg-orange-300 transition-colors'
        >
          <House size={22} />
          Home
        </Link>
        <Link
          href='https://www.calculator.net/body-fat-calculator.html'
          target='_blank'
          className='flex items-center justify-center gap-2 bg-orange-500 text-gray-900 rounded px-4 py-3 font-medium hover:bg-orange-300 transition-colors'
        >
          <Calculator size={22} />
          BF Calc
        </Link>
        <Link
          href='/volume'
          className='flex items-center justify-center gap-2 bg-orange-500 text-gray-900 rounded px-4 py-3 font-medium hover:bg-orange-300 transition-colors'
        >
          <Barbell size={22} />
          Volumes
        </Link>
        <Link
          href='/graficos'
          className='flex items-center justify-center gap-2 bg-orange-500 text-gray-900 rounded px-4 py-3 font-medium hover:bg-orange-300 transition-colors'
        >
          <ChartLine size={22} />
          Gráficos
        </Link>
        <Link
          href='/edit-treino'
          className='flex items-center justify-center gap-2 bg-orange-500 text-gray-900 rounded px-4 py-3 font-medium hover:bg-orange-300 transition-colors'
        >
          <PencilSimpleLine size={22} />
          Editar
        </Link>
        {userInfo && (
          <Button onClick={() => logOut()}>
            <SignOut size={22} />
            Sair
          </Button>
        )}
      </section>
    </aside>
  );
}
