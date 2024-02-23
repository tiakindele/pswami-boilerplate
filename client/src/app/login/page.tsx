'use client';
import { TextInput, Label, Checkbox, Button } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import * as toast from '@/services/toast';
import { useLogin, useGoogleLogin } from '@/services/users';

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const login = useLogin();
  const googleLogin = useGoogleLogin();

  const onSubmit = async (data: any) => {
    try {
      const res = await login.mutateAsync(data).then((res) => {
        toast.success('Successfully logged in');
        redirect('/home');
      });
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        Sign in to AppName
      </h2>

      <Button onClick={() => { googleLogin.mutate(); }} color="blue" className="w-full" size="xl">
        <Image src="https://www.svgrepo.com/download/475656/google-color.svg" alt="Google" width={20} height={20} className="mr-2" />
        Login with Google
      </Button>

      <div className="relative flex py-3 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput {...register('email')} required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput {...register('password')} type="password" required />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
            Lost Password?
          </a>
        </div>

        <Button type="submit">Login</Button>

        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Not registered? <a className="text-primary-700 hover:underline dark:text-primary-500">Create account</a>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
