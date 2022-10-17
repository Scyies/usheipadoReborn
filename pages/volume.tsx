import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dias } from '.';
import { diasSelectState, treinosList, userId } from '../atom/atom';
import Select from '../components/Select';
import { fetchDiasData } from '../utils/fetchDias';
import { fetchTreinosByDia, Treino } from '../utils/fetchTreinosByDia';
import { supabase } from '../supa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TreinoCard } from '../components/TreinoCard';
import { NewVolumeCard } from '../components/NewVolumeCard';
import { filteredTreinos } from '../atom/selectors';

export interface VolumeInput {
  name?: string;
  peso: string;
  reps: string;
  sets: string;
  dia: Date | null | string;
  id?: string;
}

export default function Volume() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);

  const [diasData, setDiasData] = useState<Dias[]>([]);

  const setLoggedUser = useSetRecoilState(userId);

  const userIdValue = useRecoilValue(userId);

  // const [treinosList, setTreinosList] = useState<Treino[]>([]);

  const setTreinos = useSetRecoilState(treinosList);

  const treinosLista = useRecoilValue(filteredTreinos);

  const [inputFields, setInputFields] = useState<VolumeInput>({
    name: '',
    peso: '',
    reps: '',
    sets: '',
    dia: null,
    id: '',
  });

  const [toggleEdit, setToggleEdit] = useState<string | null>(null);

  function handleFormInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function addEditBoxFields(id: string) {
    const selectedTreino = treinosLista.find((treino) => id === treino.id);
    setInputFields((prev) => ({
      ...prev,
      name: selectedTreino?.name,
      id: selectedTreino?.id,
    }));
  }

  function toggleEditor(id: string) {
    if (toggleEdit === null) {
      setToggleEdit(id);
      addEditBoxFields(id);
    } else {
      setToggleEdit(null);
    }
  }

  async function addNewVolume(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const totalVolume =
      Number(inputFields.peso) *
      Number(inputFields.reps) *
      Number(inputFields.sets);

    const { data, error } = await supabase
      .from('Volumes')
      .insert([
        {
          vol: Math.round(totalVolume),
          dia: inputFields.dia,
          treinoId: inputFields.id,
        },
      ])
      .select('*');

    if (data) {
      toast.success('Volume adicionado com sucesso!');
    }
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
    const userStorage = localStorage.getItem('token');
    userStorage && setLoggedUser(userStorage!);
  }, []);
  useEffect(() => {
    if (userIdValue) {
      fetchTreinosByDia(setTreinos, userIdValue);
    }
  }, [setTreinos, userIdValue]);
  return (
    <>
      <Header />
      <main className='mx-auto mt-8 flex min-h-[calc(100vh-170px)] max-w-xs md:max-w-md lg:max-w-lg flex-col'>
        <h1 className='text-center text-white-200 text-xs mb-4 select-none'>
          Selecione o dia da semana!
        </h1>
        <div className='self-center'>
          <Select
            selectData={diasData}
            defaultOptionValue='D. Semana'
            value={selectRecoilValue}
            onValueChange={setDiasSelect}
            selectedValue={selectRecoilValue}
          />
        </div>
        <h2 className='text-center text-white-200 text-xs mt-4 select-none'>
          Selecione o treino em que quer salvar o volume de carga
        </h2>
        <form
          onSubmit={addNewVolume}
          className='my-8 flex flex-col gap-4 items-center w-full'
        >
          {selectRecoilValue.length > 0 &&
            treinosLista.map((treino) => (
              <div
                key={treino.id}
                className='max-w-[300px] md:max-w-md lg:max-w-lg w-full overflow-hidden'
              >
                <TreinoCard
                  editState={toggleEdit}
                  edittor={toggleEditor}
                  id={treino.id!}
                  treino={treino?.name!}
                />
                {toggleEdit == treino.id && (
                  <NewVolumeCard
                    id={inputFields.id!}
                    setValue={handleFormInput}
                  />
                )}
              </div>
            ))}
          <div className='mb-8'></div>
        </form>
      </main>
      <Footer />
    </>
  );
}
