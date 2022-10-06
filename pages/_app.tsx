import type { AppProps } from "next/app";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Header from "../components/Header";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* <UserProvider supabaseClient={supabaseClient}> */}
        <Header />
        <Component {...pageProps} />
      {/* </UserProvider> */}
    </RecoilRoot>
  );
}

export default MyApp;
