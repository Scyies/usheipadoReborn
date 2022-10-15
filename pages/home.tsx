import Link from 'next/link';
import React from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Table from '../components/Table';

export default function Home() {
  return (
    <>
      <Header />
      <main className='min-h-[calc(100vh-170px)] h-full w-full mx-auto max-w-xs md:max-w-md lg:max-w-lg mt-8 flex flex-col items-center'>
        <p className='text-xs text-white-200 text-center mb-4 select-none'>
          Selecione o dia da semana!
        </p>
        <section className='flex flex-col w-full justify-center'>
          <Table />
        </section>
        <p className='text-gray-300 text-xs mb-4 select-none'>
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
