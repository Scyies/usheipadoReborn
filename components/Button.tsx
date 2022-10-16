import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

interface IButton {
  children: React.ReactNode;
  loading?: boolean;
}

export default function Button({
  children,
  loading,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & IButton) {
  return (
    <button
      className={classNames(
        'flex items-center justify-center text-center gap-2 bg-orange-500 text-gray-900 rounded px-4 py-3 font-medium hover:bg-orange-300 transition-colors',
        {
          disabled: loading,
        }
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
