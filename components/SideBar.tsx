import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { House, Barbell, ChartLine, PencilSimpleLine, Calculator } from "phosphor-react";

interface SideProps {
  status: "open" | "closed";
  // onBlur: () => void
}

export default function SideBar({ status }: SideProps) {
  return (
    <aside
      className={classNames(
        "fixed h-screen bg-white w-[50vw] right-0 px-6 transition-all z-50",
        {
          "translate-x-full": status === "closed",
          "translate-x-0": status === "open",
        }
      )}
      // onBlur={onBlur}
    >
      <section className="flex flex-col justify-center text-center gap-4">
        <Link href="/home">
          <a className="text-white bg-black p-1 rounded-md flex justify-center gap-2 items-center">
            <House size={22} />
            Home
          </a>
        </Link>
        <Link href="/">
          <a className="text-white bg-black p-1 rounded-md flex justify-center gap-2 items-center">
            <Calculator size={22} />
            BF Calculator
          </a>
        </Link>
        <Link href="/volume">
          <a className="text-white bg-black p-1 rounded-md flex justify-center gap-2 items-center">
            <Barbell size={22} />
            Volumes
          </a>
        </Link>
        <Link href="/graficos">
          <a className="text-white bg-black p-1 rounded-md flex justify-center gap-2 items-center">
            <ChartLine size={22} />
            Gráficos
          </a>
        </Link>
        <Link href="/edit-treino">
          <a className="text-white bg-black p-1 rounded-md flex justify-center gap-2 items-center">
            <PencilSimpleLine size={22} />
            Editar Treinos
          </a>
        </Link>
      </section>
    </aside>
  );
}