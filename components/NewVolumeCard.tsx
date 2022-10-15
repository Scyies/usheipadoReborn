import Button from './Button';
import { Input } from './Input';

interface NewVolumeCardProps {
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export function NewVolumeCard({ setValue, id }: NewVolumeCardProps) {
  return (
    <div className='bg-transparent border-gray-300 border-r border-l border-b rounded flex flex-col gap-4 p-4 mt-1 animate-slideIn z-0'>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='peso' className='text-gray-300 text-xs text-end'>
          Peso:
        </label>
        <div className='col-span-2'>
          <Input
            placeholder='Ex: 40'
            onChange={(event) => setValue(event)}
            name='peso'
            id='peso'
            autoComplete='off'
            type='number'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='reps' className='text-gray-300 text-xs text-end'>
          Repetições:
        </label>
        <div className='col-span-2'>
          <Input
            placeholder='Ex: 8'
            onChange={(event) => setValue(event)}
            name='reps'
            id='reps'
            autoComplete='off'
            type='number'
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
            onChange={(event) => setValue(event)}
            name='sets'
            id='sets'
            autoComplete='off'
            type='number'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 items-center gap-2'>
        <label htmlFor='sets' className='text-gray-300 text-xs text-end'>
          Data:
        </label>
        <div className='col-span-2'>
          <Input type='date' name='dia' onChange={(event) => setValue(event)} />
        </div>
      </div>
      <div className='self-center'>
        <Button>Adicionar</Button>
      </div>
    </div>
  );
}
