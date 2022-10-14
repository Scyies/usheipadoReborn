import React from 'react';
import { Dias } from '../pages';
import { Treino } from '../utils/fetchTreinosByDia';
import * as RadixSelect from '@radix-ui/react-select';

interface Props extends RadixSelect.SelectProps {
  selectData: Dias[] | Treino[];
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
      <RadixSelect.Trigger className='bg-gray-700 text-white-200 py-3 px-4 rounded outline-none w-full max-w-[140px]'>
        <RadixSelect.Value placeholder={defaultOptionValue}>
          {selectedValue}
        </RadixSelect.Value>
        <RadixSelect.Icon className='ml-2' />
      </RadixSelect.Trigger>

      <RadixSelect.Content className='text-white-200 flex justify-center text-center bg-gray-700 rounded outline-none w-full max-w-[140px] z-50'>
        <RadixSelect.ScrollUpButton />
        <RadixSelect.Viewport>
          <RadixSelect.Item
            value={defaultOptionValue}
            className='outline-none hover:bg-gray-300 px-4 py-3 text-center'
          >
            <RadixSelect.ItemText>{defaultOptionValue}</RadixSelect.ItemText>
          </RadixSelect.Item>
          {selectData &&
            selectData.map((dia: Dias | Treino) => (
              <RadixSelect.Item
                value={dia.name!}
                key={dia.id}
                textValue={dia?.name}
                className='outline-none hover:bg-gray-300 px-4 py-3 text-center'
              >
                <RadixSelect.ItemText>{dia?.name}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
        </RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton />
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
}
