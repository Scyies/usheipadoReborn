import React, { SelectHTMLAttributes } from "react";
import { Dias } from "../pages";
import { Treino } from "../utils/fetchTreinosByDia";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  selectData: Dias[] | undefined | Treino[];
  defaultOptionValue: string;
}

export default function Select({
  selectData,
  defaultOptionValue,
  ...rest
}: Props) {  

  return (
    <select
      name="weekDay"
      id=""
      className="bg-black text-white border-none outline-none rounded-full px-4 py-2 max-w-[150px]"
      {...rest}
    >
      <option value="">{defaultOptionValue}</option>
      {selectData &&
        selectData.map((dia: Dias | Treino) => (
          <option key={dia.id} value={dia.id}>
            {dia.name?.toUpperCase()}
          </option>
        ))}
    </select>
  );
}
