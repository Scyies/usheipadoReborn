import { Dispatch } from 'react';
import { TreinoInput } from '../pages/edit-treino';
import { VolumeInput } from '../pages/volume';
import Button from './Button';
import { Input } from './Input';

interface NewVolumeCardProps {
  setValue: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  input: VolumeInput;
  index: number;
}

export function NewVolumeCard({ setValue, input, index }: NewVolumeCardProps) {
  return (
    <div className='bg-transparent border-gray-300 border-r border-l border-b rounded flex flex-col gap-4 p-4 mt-1 animate-slideIn z-0'>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='peso' className='text-gray-300 text-xs text-end'>
          Peso:
        </label>
        <div className='col-span-2'>
          <Input
            placeholder='Ex: 40'
            onChange={(event) => setValue(index, event)}
            name='peso'
            id='peso'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='reps' className='text-gray-300 text-xs text-end'>
          Repetições:
        </label>
        <div className='col-span-2'>
          <Input
            placeholder='Ex: 6-8'
            onChange={(event) => setValue(index, event)}
            name='reps'
            id='reps'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='sets' className='text-gray-300 text-xs text-end'>
          Séries:
        </label>
        <div className='col-span-2'>
          <Input
            placeholder='Ex: 4'
            onChange={(event) => setValue(index, event)}
            name='sets'
            id='sets'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='sets' className='text-gray-300 text-xs text-end'>
          Data:
        </label>
        <div className='col-span-2'>
          <Input
            type='date'
            name='dia'
            onChange={(event) => setValue(index, event)}
          />
        </div>
      </div>
      <div className='self-center'>
        <Button>Adicionar</Button>
      </div>
    </div>
  );
}
