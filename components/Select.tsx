import React, { SelectHTMLAttributes, useState } from 'react';
import { Dias } from '../pages';
import { Treino } from '../utils/fetchTreinosByDia';
import * as RadixSelect from '@radix-ui/react-select';

interface Props extends RadixSelect.SelectProps {
  selectData: Dias[] | undefined | Treino[];
  defaultOptionValue: string;
  selectedValue: string;
}

export default function Select({
  selectData,
  defaultOptionValue,
  selectedValue,
  ...rest
}: Props) {
  return (
    <RadixSelect.Root name='diasId' {...rest}>
      <RadixSelect.Trigger className='bg-gray-700 text-white-200 px-4 py-3 rounded outline-none min-w-[140px]'>
        <RadixSelect.Value placeholder={defaultOptionValue}>
          {selectedValue}
        </RadixSelect.Value>
        <RadixSelect.Icon className='ml-2' />
      </RadixSelect.Trigger>

      <RadixSelect.Content className='text-white-200 bg-gray-700 rounded outline-none min-w-[140px]'>
        {selectData &&
          selectData.map((dia: Dias | Treino) => (
            <RadixSelect.Item
              value={dia.id}
              key={dia.id}
              textValue={dia?.name}
              className='outline-none hover:bg-gray-300 px-4 py-3 text-center'
            >
              {dia?.name}
            </RadixSelect.Item>
          ))}
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
}
