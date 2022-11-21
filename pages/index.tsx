import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { user } from '../atom/atom';
import Button from '../components/Button';
import { supabase } from '../supa';
import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  IdentificationBadge,
  LockKey,
} from 'phosphor-react';
import { Loading } from '../components/Loading';
import googleLogo from '../public/googleIcon.png';
import { useGetUser } from '../hooks/useGetUser';
import classNames from 'classnames';

export type Dias = {
  id: string;
  name: string;
  created_at: Date;
};

const Home: NextPage = () => {
  const [formType, setFormType] = useState<'login' | 'sigin'>('login');
  const setLoggedUser = useSetRecoilState(user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passVisible, setPassVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const { setUserInfo } = useGetUser();

  const router = useRouter();

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const input = Object.fromEntries(formData);

    if (formType === 'sigin') {
      setIsLoading(true);

      if (!input) return toast.error('Favor preencher todos os campos!');

      if (input.senha !== input.confirmarSenha) {
        return toast.error('As duas senhas não são iguais!');
      }

      const { data, error } = await supabase.auth.signUp({
        email: String(input.email),
        password: String(input.password),
        options: {
          data: {
            name: String(input.name),
          },
        },
      });

      if (error) {
        console.error(error);
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      if (data) {
        setLoggedUser(data['session']);

        toast.success('Usuário criado com sucesso!');
        setIsLoading(false);
        return router.push('/home');
      }
    }

    if (formType === 'login') {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: String(input.email),
        password: String(input.password),
      });

      if (error) {
        console.log(error);
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      if (data) {
        setLoggedUser(data['session']);
        toast.success('Login realizado com sucesso!');
        setIsLoading(false);
        return router.push('/home');
      }
    }
  }

  async function signInWithGoogle() {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) return console.error(error);
    if (data) {
      setIsLoading(false);
      return router.push('/home');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('sb-ffmfgzhdzqrowugjvpaz-auth-token');
    if (token) {
      setUserInfo(JSON.parse(token));
      router.push('/home');
    }
  }, []);

  return (
    <div>
      <Head>
        <title>USheipado</title>
        <meta name='description' content='Generated by create next app' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff'></meta>
      </Head>

      <>
        <main className='flex flex-col min-h-screen justify-center'>
          <header className='flex flex-col items-center justify-center gap-4 mt-10 select-none'>
            <Image src={Logo} alt='' className='w-[135px] h-[60px]' />
            <span className='text-white-200 text-lg md:text-xl lg:text-2xl'>
              USheipado
            </span>
          </header>
          <section className='w-full mx-auto max-w-xs md:max-w-md lg:max-w-lg my-6 flex flex-col justify-center'>
            <h1 className='text-gray-300 text-xs md:text-sm text-center select-none'>
              {formType === 'login'
                ? 'Faça o login e comece a controlar seu treino!'
                : 'Crie sua conta agora mesmo!'}
            </h1>

            <span
              className={classNames(
                'self-center mt-4 cursor-pointer p-1 bg-gray-500 rounded-full hover:bg-gray-700 transition-colors',
                {
                  'pointer-events-none': isLoading,
                }
              )}
              onClick={signInWithGoogle}
            >
              <Image src={googleLogo} width={32} height={32} alt='' />
            </span>

            {formType === 'login' ? (
              <form
                onSubmit={handleSignIn}
                className='my-8 flex flex-col gap-4'
              >
                <div className='flex flex-col gap-2'>
                  <label htmlFor='' className='text-white-200 text-xs'>
                    E-mail
                  </label>
                  <Input
                    name='email'
                    autoComplete='off'
                    type='email'
                    icon={<EnvelopeSimple size={24} />}
                    placeholder='example@example.com'
                  />
                </div>
                <div className='relative flex flex-col gap-2 mb-4'>
                  <label htmlFor='' className='text-white-200 text-xs'>
                    Senha
                  </label>
                  <Input
                    icon={<LockKey size={24} />}
                    name='senha'
                    type={`${passVisible.password ? 'text' : 'password'}`}
                    autoComplete='off'
                    placeholder='*********'
                  />
                  <span
                    className='absolute right-3 top-10 text-gray-300 cursor-pointer'
                    onClick={() =>
                      setPassVisible((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                  >
                    {passVisible.password ? (
                      <EyeSlash size={24} weight='fill' />
                    ) : (
                      <Eye size={24} weight='fill' />
                    )}
                  </span>
                </div>
                <Button type='submit' loading={isLoading}>
                  {!isLoading ? 'Entrar na plataforma' : <Loading />}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={handleSignIn}
                className='my-8 flex flex-col gap-4'
              >
                <div className='flex flex-col gap-2'>
                  <label htmlFor='' className='text-white-200 text-xs'>
                    Nome
                  </label>
                  <Input
                    name='nome'
                    autoComplete='off'
                    placeholder='Fulano de tal'
                    type='text'
                    icon={<IdentificationBadge size={24} />}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='' className='text-white-200 text-xs'>
                    E-mail
                  </label>
                  <Input
                    name='email'
                    autoComplete='off'
                    type='email'
                    icon={<EnvelopeSimple size={24} />}
                    placeholder='example@example.com'
                  />
                </div>
                <div className='relative flex flex-col gap-2'>
                  <label htmlFor='' className='text-white-200 text-xs'>
                    Senha
                  </label>
                  <Input
                    icon={<LockKey size={24} />}
                    name='senha'
                    type={`${passVisible.password ? 'text' : 'password'}`}
                    autoComplete='off'
                    placeholder='*********'
                  />
                  <span
                    className='absolute right-3 top-10 text-gray-300 cursor-pointer'
                    onClick={() =>
                      setPassVisible((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                  >
                    {passVisible.password ? (
                      <EyeSlash size={24} weight='fill' />
                    ) : (
                      <Eye size={24} weight='fill' />
                    )}
                  </span>
                </div>
                <div className='relative flex flex-col gap-2 mb-4'>
                  <label htmlFor='' className='text-white-200 text-xs'>
                    Confirmar senha
                  </label>
                  <Input
                    icon={<LockKey size={24} />}
                    name='confirmarSenha'
                    type={`${
                      passVisible.confirmPassword ? 'text' : 'password'
                    }`}
                    autoComplete='off'
                    placeholder='*********'
                  />
                  <span
                    className='absolute right-3 top-10 text-gray-300 cursor-pointer'
                    onClick={() =>
                      setPassVisible((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                  >
                    {passVisible.confirmPassword ? (
                      <EyeSlash size={24} weight='fill' />
                    ) : (
                      <Eye size={24} weight='fill' />
                    )}
                  </span>
                </div>
                <Button type='submit' loading={isLoading}>
                  {!isLoading ? 'Cadastrar' : <Loading />}
                </Button>
              </form>
            )}
            {formType === 'login' && (
              <p className='text-gray-300 text-center underline text-xs mb-8'>
                Esqueceu sua senha?
              </p>
            )}
            {formType === 'login' ? (
              <p
                className='text-gray-300 text-center underline text-xs cursor-pointer hover:text-white-200'
                onClick={() => setFormType('sigin')}
              >
                Ainda não tem uma conta? Cadastre-se agora!
              </p>
            ) : (
              <p
                className='text-gray-300 text-center underline text-xs cursor-pointer hover:text-white-200'
                onClick={() => setFormType('login')}
              >
                Já tem uma conta? Faça seu login!
              </p>
            )}
          </section>
        </main>
      </>
    </div>
  );
};

export default Home;
