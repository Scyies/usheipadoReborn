import { PencilSimpleLine, TrashSimple } from 'phosphor-react';
import { ChangeEvent, Dispatch, FormEvent, MouseEventHandler } from 'react';
import { TreinoInput } from '../pages/edit-treino';
import { Treino } from '../utils/fetchTreinosByDia';
import Button from './Button';
import { Input } from './Input';

interface EditCardProps {
  setValue: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  input: TreinoInput;
  index: number;
  mutationType: Dispatch<React.SetStateAction<'' | 'edit' | 'delete'>>;
}

export function EditCard({
  setValue,
  input,
  index,
  mutationType,
}: EditCardProps) {
  return (
    <div className='bg-transparent border-gray-300 border-r border-l border-b rounded flex flex-col gap-4 p-4 mt-1 animate-slideIn'>
      <div className='flex items-center gap-2'>
        <label htmlFor='treino' className='text-gray-300 text-xs'>
          Treino:
        </label>
        <Input
          placeholder='RDL'
          defaultValue={input.name}
          onChange={(event) => setValue(index, event)}
          name='name'
        />
      </div>
      <div className='flex items-center gap-2'>
        <label htmlFor='treino' className='text-gray-300 text-xs'>
          Repetições:
        </label>
        <Input
          placeholder='6-8'
          defaultValue={input.reps}
          name='reps'
          onChange={(event) => setValue(index, event)}
        />
      </div>
      <div className='flex items-center gap-2'>
        <label htmlFor='treino' className='text-gray-300 text-xs'>
          Séries:
        </label>
        <Input
          placeholder='3'
          defaultValue={input.sets}
          name='sets'
          onChange={(event) => setValue(index, event)}
        />
      </div>
      <div className='flex justify-around'>
        <Button
          className='flex text-orange-500 gap-2'
          onClick={() => mutationType('delete')}
          type='submit'
        >
          <TrashSimple size={24} /> Excluir
        </Button>
        <Button
          className='flex text-blue-500 gap-2'
          onClick={() => mutationType('edit')}
          type='submit'
        >
          <PencilSimpleLine size={24} /> Editar
        </Button>
      </div>
    </div>
  );
}
