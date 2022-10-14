import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userId } from '../atom/atom';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Table from '../components/Table';

export default function Home() {
  const userIdValue: string = useRecoilValue(userId);
  const router = useRouter();
  return (
    <>
      <Header />
      <main className='mx-auto max-w-xs mt-8 flex flex-col items-center'>
        <p className='text-xs text-white-200 text-center mb-4'>
          Selecione o dia da semana!
        </p>
        <section className='flex flex-col justify-center'>
          <Table />
        </section>
        <p className='text-gray-300 text-xs mb-4'>
          Ainda não cadastrou seu treino?
        </p>
        <Link href='/novo-treino'>
          <a className='mb-8'>
            <Button>Novo treino</Button>
          </a>
        </Link>
      </main>
      <Footer />
    </>
  );
}
