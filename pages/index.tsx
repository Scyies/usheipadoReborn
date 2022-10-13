import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { userId } from '../atom/atom';
import Button from '../components/Button';
import { supabase } from '../supa';
import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import { EnvelopeSimple, IdentificationBadge, LockKey } from 'phosphor-react';

export type Dias = {
  id: string;
  name: string;
  created_at: Date;
};

const Home: NextPage = () => {
  const [formType, setFormType] = useState<'login' | 'sigin'>('login');
  const setLoggedUser = useSetRecoilState(userId);

  const router = useRouter();

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const input = Object.fromEntries(formData);

    if (formType === 'sigin') {
      if (!input) return;

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
        console.log(error);
        toast.error(error.message);
        return;
      }

      if (data) {
        console.log(data);
        const session = localStorage.setItem(
          'token',
          data['session']?.user.id!
        );
        setLoggedUser(data['session']?.user.id!);

        toast.success('Usuário criado com sucesso!');
        return router.push('/home');
      }
    }

    if (formType === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: String(input.email),
        password: String(input.password),
      });

      if (error) {
        console.log(error);
        toast.error(error.message);
        return;
      }

      if (data) {
        const session = localStorage.setItem(
          'token',
          data['session']?.user.id!
        );
        setLoggedUser(data['session']?.user.id!);
        toast.success('Login realizado com sucesso!');
        return router.push('/home');
      }
    }
  }

  return (
    <div>
      <Head>
        <title>USheipado</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='../assets/two-oranges-logo.svg' />
      </Head>

      <>
        <header className='flex flex-col items-center justify-center gap-4 mt-10'>
          <Image src={Logo} alt='' className='w-[135px] h-[60px]' />
          <h1 className='text-white-200 text-lg'>USheipado</h1>
        </header>
        <main className='mx-6 my-6 flex flex-col justify-center'>
          <p className='text-gray-300 text-xs text-center'>
            {formType === 'login'
              ? 'Faça o login e comece a controlar seu treino!'
              : 'Crie sua conta agora mesmo!'}
          </p>

          {formType === 'login' ? (
            <form onSubmit={handleSignIn} className='my-8 flex flex-col gap-4'>
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
              <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor='' className='text-white-200 text-xs'>
                  Senha
                </label>
                <Input
                  icon={<LockKey size={24} />}
                  name='senha'
                  type='password'
                  autoComplete='off'
                  placeholder='*********'
                />
              </div>
              <Button type='submit'>Entrar na plataforma</Button>
            </form>
          ) : (
            <form onSubmit={handleSignIn} className='my-8 flex flex-col gap-4'>
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
              <div className='flex flex-col gap-2'>
                <label htmlFor='' className='text-white-200 text-xs'>
                  Senha
                </label>
                <Input
                  icon={<LockKey size={24} />}
                  name='senha'
                  type='password'
                  autoComplete='off'
                  placeholder='*********'
                />
              </div>
              <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor='' className='text-white-200 text-xs'>
                  Confirmar senha
                </label>
                <Input
                  icon={<LockKey size={24} />}
                  name='confirmarSenha'
                  type='password'
                  autoComplete='off'
                  placeholder='*********'
                />
              </div>
              <Button type='submit'>Cadastrar</Button>
            </form>
          )}
          {formType === 'login' && (
            <p className='text-gray-300 text-center underline text-xs mb-8'>
              Esqueceu sua senha?
            </p>
          )}
          {formType === 'login' ? (
            <p
              className='text-gray-300 text-center underline text-xs'
              onClick={() => setFormType('sigin')}
            >
              Ainda não tem uma conta? Cadastre-se agora!
            </p>
          ) : (
            <p
              className='text-gray-300 text-center underline text-xs'
              onClick={() => setFormType('login')}
            >
              Já tem uma conta? Faça seu login!
            </p>
          )}
        </main>
      </>
    </div>
  );
};

export default Home;
