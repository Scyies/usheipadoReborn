import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Dias } from "..";
import { diasSelectState } from "../../atom/atom";
import Button from "../../components/Button";
import EditRow from "../../components/EditRow";
import Select from "../../components/Select";
import { fetchDiasData } from "../../utils/fetchDias";
import { fetchTreinosByDia, Treino } from "../../utils/fetchTreinosByDia";
import { supabase } from "../supa";
import edit from "../../assets/edit.svg";
import Image from "next/image";
import classNames from "classnames";

interface TreinoInput {
  name: string | undefined;
  reps: string | undefined;
  sets: string | undefined;
}

interface TreinoState {
  TreinoInput: TreinoInput;
}

export default function EditTreino() {
  const [diasData, setDiasData] = useState<Dias[]>([]);
  const setDiasSelect = useSetRecoilState(diasSelectState);
  const selectRecoilValue = useRecoilValue(diasSelectState);
  const [editableTreino, setEditableTreino] = useState<Treino[]>([]);

  const [inputFields, setInputFields] = useState<TreinoInput[]>([]);

  const [toggleEdit, setToggleEdit] = useState<number | null>(null);

  function handleFormChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let data: TreinoInput[] = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  function addFieldsByTreinos(editableTreino: Treino[]) {
    let newField: TreinoInput[] = [];
    editableTreino.map((treino) => {
      let field = {
        name: treino.name,
        reps: treino.reps,
        sets: String(treino.sets),
        id: treino.id,
      };
      newField.push(field);
    });
    setInputFields(newField);
  }

  async function handleTreinoUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(toggleEdit == null) {
      return
    }

    try {
      const { data, error } = await supabase
        .from("Treinos")
        .update({
          name: inputFields[toggleEdit!].name,
          reps: inputFields[toggleEdit!].reps,
          sets: Number(inputFields[toggleEdit!].sets),
        })
        .match({
          id: editableTreino[toggleEdit!].id,
        });

      if (data) {
        console.log(data);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function toggleEditor(index: number) {
    if(toggleEdit === null) {
      setToggleEdit(index)
    } else {
      setToggleEdit(null)
    }
  }

  useEffect(() => {
    fetchDiasData(setDiasData);
  }, []);
  useEffect(() => {
    fetchTreinosByDia(setEditableTreino, selectRecoilValue);
  }, [selectRecoilValue]);
  useEffect(() => {
    addFieldsByTreinos(editableTreino);
  }, [editableTreino]);
  return (
    <main className="mx-6 mt-8 flex flex-col items-center">
      <Select
        selectData={diasData}
        defaultOptionValue="D. Semana"
        onChange={(e) => setDiasSelect(e.target.value)}
        value={selectRecoilValue}
      />
      <form
        className="my-8 flex flex-col items-center"
        onSubmit={handleTreinoUpdate}
      >
        {selectRecoilValue.length > 0 &&
          inputFields.map((input, index) => (
            <div className={classNames("grid grid-cols-6 gap-4 mb-8 items-center p-1", {
              "bg-black/30 rounded-full": toggleEdit == index
            })} key={index}>
              <input
                className="col-span-2 bg-black text-white rounded-full px-4 py-2 text-center"
                placeholder={input.name}
                name="name"
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                className="bg-black text-white rounded-full px-4 py-2 text-center col-span-2"
                placeholder={input.reps}
                name="reps"
                value={input.reps}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                className="bg-black text-white rounded-full px-4 py-2 text-center"
                placeholder={input.sets}
                name="sets"
                value={input.sets}
                onChange={(event) => handleFormChange(index, event)}
              />
              <Button
                onClick={() => toggleEditor(index)}
                className={classNames("text-white h-[30px] w-[30px] hover:bg-black/30 rounded-full p-1 mx-auto", {
                  "bg-black/30 rounded-full": toggleEdit == index
                })}
              >
                <Image src={edit} alt="" />
              </Button>
            </div>
          ))}

        <Button type="submit">Salvar</Button>
      </form>
    </main>
  );
}