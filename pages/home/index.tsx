import Link from "next/link";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userId } from "../../atom/atom";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { supabase } from "../supa";

export default function Home() {
  const setUserId = useSetRecoilState(userId);
  const userIdValue: string = useRecoilValue(userId);
  // async function getUser() {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   if(user) {
  //     setUserId(user!['id']);
  //   }
  //   return user!['id'];
  // }
  // getUser();

  // console.log(userIdValue);
  
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
