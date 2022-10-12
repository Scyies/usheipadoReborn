import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userId } from '../../atom/atom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Table from '../../components/Table';

export default function Home() {
  const userIdValue: string = useRecoilValue(userId);
  const router = useRouter();

  return (
    <>
      <Header />
      <main className='mx-6 md:mx-8 mt-8 flex flex-col items-center'>
        <p className='text-xs text-white-200 text-center mb-4'>
          Selecione o dia da semana!
        </p>
        <section className='flex flex-col justify-center'>
          <Table />
        </section>
        <Link href='/novo-treino' passHref>
          <a className='mb-8'>
            <Button>Novo treino</Button>
          </a>
        </Link>
      </main>
    </>
  );
}
