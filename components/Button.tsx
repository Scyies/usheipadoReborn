import React, { ButtonHTMLAttributes } from 'react';

interface IButton {
  children: React.ReactNode;
}

export default function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & IButton) {
  return (
    <button
      className='bg-orange-500 text-gray-900 rounded px-4 py-3 font-medium hover:bg-orange-300 transition-colors'
      {...rest}
    >
      {children}
    </button>
  );
}
