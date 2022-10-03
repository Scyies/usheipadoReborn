import Link from "next/link";
import React from "react";
import classNames from "classnames";

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
      <section className="flex flex-col justify-center text-center">
        <Link href="/">
          <a className="text-black border-t-2 border-b-2 border-black">Home</a>
        </Link>
        <Link href="/">
          <a className="text-black border-t-2 border-b-2 border-black mt-8">
            BF Calculator
          </a>
        </Link>
        <Link href="/volume">
          <a className="text-black border-t-2 border-b-2 border-black mt-8">
            Volumes
          </a>
        </Link>
        <Link href="/">
          <a className="text-black border-t-2 border-b-2 border-black mt-8">
            Calorias
          </a>
        </Link>
        <Link href="/graficos">
          <a className="text-black border-t-2 border-b-2 border-black mt-8">
            Gráficos
          </a>
        </Link>
        <Link href="/edit-treino">
          <a className="text-black border-t-2 border-b-2 border-black mt-8">
            Editar Treinos
          </a>
        </Link>
      </section>
    </aside>
  );
}
