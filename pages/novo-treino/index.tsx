import React, { useEffect, useState } from "react";
import { diasSelectState, userId } from "../../atom/atom";
import Select from "../../components/Select";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { fetchDiasData } from "../../utils/fetchDias";
import { Dias } from "..";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { supabase } from "../supa";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function NovoTreino() {
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const userIdValue = useRecoilValue(userId);
  const router = useRouter();

  async function handleNovoTreino(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const input = Object.fromEntries(formData);

    const treinoInput = {
      name: String(input.name),
      reps: String(input.reps),
      sets: Number(input.sets),
      diasId: String(input.diasId),
      user_id: userIdValue
    };

    if (!treinoInput.name || !treinoInput.reps || !treinoInput.sets || !treinoInput.diasId || !treinoInput.user_id) {
      toast.error("Favor preencher todos os campos!");
      return
    }

    const { data, error } = await supabase
      .from("Treinos")
      .insert([{ name: treinoInput.name, reps: treinoInput.reps, sets: treinoInput.sets, diasId: treinoInput.diasId, user_id: treinoInput.user_id }])
      .select("*")

    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success("Treino adicionado com sucesso!");
    }
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
  }, []);
  return (
    <>
      <form
        onSubmit={handleNovoTreino}
        className="mx-20 mt-8 flex justify-center flex-col"
      >
        <div className="self-center mb-8">
          <Select
            selectData={diasData}
            defaultOptionValue="D. Semana"
            onChange={(e) => setDiasSelect(e.target.value)}
            value={selectRecoilValue}
            name="diasId"
          />
        </div>
        <div className="flex flex-col text-center">
          <label htmlFor="" className="font-bold">
            Movimento
          </label>
          <Input placeholder="Ex: Barra fixa" name="name" autoComplete="off" />
        </div>
        <div className="flex flex-col text-center mt-8">
          <label htmlFor="" className="font-bold">
            Repetições
          </label>
          <Input placeholder="Ex: 8-10" name="reps" autoComplete="off" />
        </div>
        <div className="flex flex-col text-center mt-8 mb-8">
          <label htmlFor="" className="font-bold">
            Séries
          </label>
          <Input placeholder="Ex: 4" name="sets" autoComplete="off" />
        </div>
        <Button type="submit">Adicionar</Button>
      </form>
    </>
  );
}
