import classNames from 'classnames';
import { CaretDown, CaretLeft } from 'phosphor-react';

interface TreinoCardProps {
  editState: number | null;
  edittor: (index: number) => void;
  index: number;
  treino: string;
}

export function TreinoCard({
  edittor,
  editState,
  index,
  treino,
}: TreinoCardProps) {
  return (
    <div className='flex border-b border-gray-300 rounded min-w-[300px] w-full px-4 py-2'>
      <div className='flex gap-2 items-center flex-1'>
        <label className='text-gray-300 text-xs'>Treino:</label>
        <p className='text-white-200 text-md'>{treino}</p>
      </div>
      <span
        onClick={() => edittor(index)}
        className={classNames(
          'text-white-200 h-[30px] w-[30px] p-1 mx-auto cursor-pointer'
        )}
      >
        {editState == index ? <CaretDown size={22} /> : <CaretLeft size={22} />}
      </span>
    </div>
  );
}
