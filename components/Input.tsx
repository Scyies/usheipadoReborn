import React, { InputHTMLAttributes } from 'react'

export default function Input({...rest}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className='bg-black text-white rounded-full px-4 py-2 text-center' {...rest} />
  )
}
