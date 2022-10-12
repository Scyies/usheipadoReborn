import React, { SelectHTMLAttributes } from 'react';
import { Dias } from '../pages';
import { Treino } from '../utils/fetchTreinosByDia';
import * as RadixSelect from '@radix-ui/react-select';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  selectData: Dias[] | undefined | Treino[];
  defaultOptionValue: string;
}

export default function Select({
  selectData,
  defaultOptionValue,
  ...rest
}: Props) {
  return (
    <RadixSelect.Root>
      <RadixSelect.Trigger className='bg-gray-700 text-white-200 px-4 py-3 rounded outline-none min-w-[140px]'>
        <RadixSelect.Value placeholder={defaultOptionValue} {...rest} />
        <RadixSelect.Icon className='ml-2' />
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className='fixed top-1/3 left-1/2 -translate-x-1/2 text-white-200 bg-gray-700 rounded outline-none min-w-[140px]'>
          {selectData &&
            selectData.map((dia: Dias | Treino) => (
              <RadixSelect.Item
                value={dia.id}
                key={dia.id}
                className='outline-none hover:bg-gray-300 px-4 py-3 text-center'
              >
                {dia?.name}
              </RadixSelect.Item>
            ))}
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>

    // <select
    //   name='weekDay'
    //   id=''
    //   className='bg-gray-700 text-white-200 border-none outline-none rounded px-4 py-3 max-w-[150px]'
    //   {...rest}
    // >
    //   <option value=''>{defaultOptionValue}</option>
    //   {selectData &&
    //     selectData.map((dia: Dias | Treino) => (
    //       <option key={dia.id} value={dia.id}>
    //         {dia?.name}
    //       </option>
    //     ))}
    // </select>
  );
}
