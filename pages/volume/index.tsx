import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Dias } from "..";
import { diasSelectState } from "../../atom/atom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Select from "../../components/Select";
import SubmitMessage from "../../components/SubmitMessage";
import { fetchDiasData } from "../../utils/fetchDias";
import { fetchTreinosNameByDia, Treino } from "../../utils/fetchTreinosByDia";
import { supabase } from "../supa";

export default function Volume() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const [treinoSelectState, setTreinoSelectState] = useState<Treino[]>([]);
  const [treinoSelect, setTreinoSelect] = useState<string>("");

  async function handleNovoVolume(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const input = Object.fromEntries(formData);

    const totalVolume =
      Number(input.vol) * Number(input.reps) * Number(input.sets);

    const volumeInput = {
      vol: Math.round(totalVolume),
      dia: input.dia,
      treinoId: input.treinoId,
    };

    const { data, error } = await supabase.from("Volumes").insert([
      {
        vol: volumeInput.vol,
        dia: volumeInput.dia,
        treinoId: volumeInput.treinoId,
      },
    ]).select("*")

    if (data) {
      toast.success("Volume adicionado com sucesso!");
    }
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
    fetchTreinosNameByDia(setTreinoSelectState, selectRecoilValue);
  }, [selectRecoilValue]);
  return (
    <>
      <main className="mx-6 mt-8 flex justify-center flex-col">
        <h1 className="text-center text-black text-sm mb-8">
          Insira a média do peso utilizado, o número médio de repetições e as
          séries.
        </h1>
        <div className="self-center">
          <Select
            selectData={diasData}
            defaultOptionValue="D. Semana"
            onChange={(e) => setDiasSelect(e.target.value)}
            value={selectRecoilValue}
          />
        </div>
        <form
          onSubmit={handleNovoVolume}
          className="flex flex-col mt-8 place-items-center mb-8"
        >
          <div className="flex flex-col items-center gap-8 w-full justify-between mb-6">
            <Select
              selectData={treinoSelectState}
              defaultOptionValue="Exercício"
              onChange={(e) => setTreinoSelect(e.target.value)}
              value={treinoSelect}
              name="treinoId"
            />
            <div className="grid grid-cols-3 gap-4 w-full text-center mb-4">
              <div className="w-full">
                <Input
                  placeholder="Peso"
                  className="bg-black text-white rounded-full px-4 py-2 text-center w-full"
                  name="vol"
                  autoComplete="off"
                />
              </div>
              <div>
                <Input
                  placeholder="Reps"
                  className="bg-black text-white rounded-full px-4 py-2 text-center w-full"
                  name="reps"
                  autoComplete="off"
                />
              </div>
              <div>
                <Input
                  placeholder="Sets"
                  className="bg-black text-white rounded-full px-4 py-2 text-center w-full"
                  name="sets"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <Input type="date" name="dia" />
          </div>
          <Button type="submit">Adicionar</Button>
        </form>
      </main>
    </>
  );
}
