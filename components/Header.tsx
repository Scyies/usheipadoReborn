import React, { useState } from "react";
import SideBar from "./SideBar";

export default function Header() {
  const [openState, setOpenState] = useState<'open' | 'closed'>('closed');

  function openNav() {
    if(openState === 'closed') {
      setOpenState('open')
    } else {
      setOpenState('closed')
    }
  }

  return (
    <>
      <header
        className="mx-6 mt-4
      flex justify-between items-center
      pb-4"
      >
        <strong className="text-lg text-black font-black">
          USheipado
        </strong>
        <nav onClick={openNav}>
          <div className="bg-black h-[3px] w-6 rounded-full mb-1"></div>
          <div className="bg-black h-[3px] w-6 rounded-full mb-1"></div>
          <div className="bg-black h-[3px] w-5 rounded-full"></div>
        </nav>
      </header>
      <SideBar status={openState} />
      <div className="bg-black h-[3px] mx-6 rounded-full"></div>
    </>
  );
}
