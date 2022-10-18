import classNames from 'classnames';
import { PencilSimpleLine, TrashSimple } from 'phosphor-react';
import { Dispatch } from 'react';
import { Treino } from '../utils/fetchTreinosByDia';
import Button from './Button';
import { Input } from './Input';

interface EditCardProps {
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  treino: Treino;
  id: string;
  mutationType: Dispatch<React.SetStateAction<'' | 'edit' | 'delete'>>;
  loading: boolean;
  deleted?: { id: string; value: boolean };
}

export function EditCard({
  setValue,
  treino,
  id,
  mutationType,
  loading,
  deleted,
}: EditCardProps) {
  return (
    <div
      className={classNames(
        'bg-transparent border-gray-300 border-r border-l border-b rounded flex flex-col gap-4 p-4 mt-1 animate-slideIn z-0',
        {
          hidden: deleted?.id === id && deleted.value === true,
        }
      )}
    >
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='treino' className='text-gray-300 text-xs text-end'>
          Treino:
        </label>
        <div className='col-span-2'>
          <Input
            placeholder='RDL'
            defaultValue={treino.name}
            onChange={(event) => setValue(event)}
            name='name'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='treino' className='text-gray-300 text-xs text-end'>
          Repetições:
        </label>
        <div className='col-span-2'>
          <Input
            placeholder='6-8'
            defaultValue={treino.reps}
            name='reps'
            onChange={(event) => setValue(event)}
          />
        </div>
      </div>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='treino' className='text-gray-300 text-xs text-end'>
          Séries:
        </label>
        <div className='col-span-2'>
          <Input
            placeholder='3'
            defaultValue={treino.sets}
            name='sets'
            onChange={(event) => setValue(event)}
            type='number'
          />
        </div>
      </div>
      <div className='flex justify-around'>
        <Button
          className='flex text-orange-500 gap-2'
          onClick={() => mutationType('delete')}
          type='submit'
          loading={loading}
        >
          <TrashSimple size={24} /> Excluir
        </Button>
        <Button
          className='flex text-blue-500 gap-2'
          onClick={() => mutationType('edit')}
          type='submit'
          loading={loading}
        >
          <PencilSimpleLine size={24} /> Editar
        </Button>
      </div>
    </div>
  );
}
