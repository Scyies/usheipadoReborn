import React, { ButtonHTMLAttributes } from 'react'

interface IButton{
  children: React.ReactNode;
}

export default function Button({children, ...rest}: ButtonHTMLAttributes<HTMLButtonElement> & IButton) {
  return (
    <button className='bg-black text-white rounded-full px-4 py-2'
     {...rest}
    >
      {children}
    </button>
  )
}
