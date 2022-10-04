import Link from "next/link";
import React from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";

export default function Home() {
  return (
    <main className="mx-6 mt-8">
      <div className="flex justify-end">
        <Link href="/novo-treino" passHref>
          <a className="mb-8">
            <Button>Novo treino</Button>
          </a>
        </Link>
      </div>
      <section className="flex flex-col justify-center">
        <Table />
      </section>
    </main>
  );
}
