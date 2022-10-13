import React from 'react';
import Image from 'next/image';
import Logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <footer className='max-w-[48px] mx-auto py-4'>
      <Image src={Logo} alt='' />
    </footer>
  );
}
