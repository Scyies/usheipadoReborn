import React, { useState } from 'react';
import SideBar from './SideBar';
import Image from 'next/image';
import Logo from '../assets/logo.svg';

export default function Header() {
  const [openState, setOpenState] = useState<'open' | 'closed'>('closed');

  function openNav() {
    if (openState === 'closed') {
      setOpenState('open');
    } else {
      setOpenState('closed');
    }
  }

  return (
    <>
      <header
        className='mx-6 md:mx-8 mt-4
      flex justify-between items-center
      pb-4'
      >
        <div className='max-w-[90px]'>
          <Image src={Logo} alt='' />
        </div>
        <nav onClick={openNav}>
          <div className='bg-orange-500 h-[3px] w-6 rounded-full mb-1'></div>
          <div className='bg-orange-500 h-[3px] w-6 rounded-full mb-1'></div>
          <div className='bg-orange-500 h-[3px] w-5 rounded-full'></div>
        </nav>
      </header>
      <SideBar status={openState} />
    </>
  );
}
