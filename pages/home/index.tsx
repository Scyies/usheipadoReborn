import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userId } from "../../atom/atom";
import Button from "../../components/Button";
import Table from "../../components/Table";

export default function Home() {
  const userIdValue: string = useRecoilValue(userId);
  const router = useRouter();

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
