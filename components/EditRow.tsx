import React, { InputHTMLAttributes } from "react";
import { Treino } from "../utils/fetchTreinosByDia";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  treino: Treino
}

export default function EditRow({treino, ...rest}: Props) {
  console.log(treino);
  
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <input 
        className="col-span-2 bg-black text-white rounded-full px-4 py-2 text-center" {...rest} 
        placeholder={treino.name}
        name={`name ${treino.name}`}
      />
      <input 
        className="bg-black text-white rounded-full px-4 py-2 text-center" {...rest} 
        placeholder={treino.reps} 
        name={`reps ${treino.name}`}
      />
      <input 
        className="bg-black text-white rounded-full px-4 py-2 text-center" {...rest} 
        placeholder={String(treino.sets)}
        name={`sets ${treino.name}`}
      />
    </div>
  );
}
