import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* <Header /> */}
      <Component {...pageProps} />
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme='colored'
      />
    </RecoilRoot>
  );
}

export default MyApp;
