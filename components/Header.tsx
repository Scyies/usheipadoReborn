import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Image from 'next/image';
import Logo from '../assets/logo.svg';
import classNames from 'classnames';
import { supabase } from '../supa';
import { useSetRecoilState } from 'recoil';
import { user } from '../atom/atom';
import { useGetUser } from '../hooks/useGetUser';

export default function Header() {
  const [openState, setOpenState] = useState<'open' | 'closed'>('closed');
  const { setUserInfo } = useGetUser();

  supabase.auth.onAuthStateChange((event, session) => {
    setUserInfo(session);
    console.log(event);
  });

  function openNav() {
    if (openState === 'closed') {
      setOpenState('open');
    } else {
      setOpenState('closed');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('sb-ffmfgzhdzqrowugjvpaz-auth-token');
    if (token) {
      setUserInfo(JSON.parse(token));
    }
  }, []);

  return (
    <>
      <header
        className='mx-6 md:mx-8 mt-4
      flex justify-between items-center
      pb-4 select-none'
      >
        <div className='max-w-[90px]'>
          <Image src={Logo} alt='' />
        </div>
        <nav onClick={openNav} className='cursor-pointer'>
          <div
            className={classNames(
              'bg-orange-500 h-[3px] w-6 rounded-full mb-1  transition-all',
              {
                'rotate-45 translate-y-[6px]': openState === 'open',
              }
            )}
          ></div>
          <div
            className={classNames(
              'bg-orange-500 h-[3px] w-6 rounded-full mb-1  transition-all',
              {
                '-rotate-45 -translate-y-[1px]': openState === 'open',
              }
            )}
          ></div>
          <div
            className={classNames(
              'bg-orange-500 h-[3px] w-5 rounded-full  transition-all',
              {
                'translate-x-full opacity-0': openState === 'open',
              }
            )}
          ></div>
        </nav>
      </header>
      <SideBar status={openState} />
    </>
  );
}
