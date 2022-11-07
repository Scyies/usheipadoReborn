import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>USheipado</title>
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          draggable
          theme='dark'
          transition={Slide}
          limit={1}
        />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
