'use client';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { useUser } from "@/services/users";


export default function OnboardingPage() {
  const { register } = useFormContext();
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  const onNext = () => {
    router.push('/onboarding/details');
  };

  return (
    <div className="flex flex-col items-center md:px-12 p-4 w-full h-full">
      <p className="text-lg font-medium text-gray-400">Hello there!</p>
      <h1 className="text-4xl font-medium text-gray-900 dark:text-white py-8">Choose your vibe</h1>

      <div className="flex flex-col justify-center w-full">
        <ul className="grid w-full gap-6 md:grid-cols-1">
          <li>
            <input type="radio" id="basic_plan" value="basic_plan" className="hidden peer" required {...register('plan')} />
            <label htmlFor="basic_plan" className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="block">
                <div className="w-full text-md font-semibold">Baisic Plan</div>
                <div className="w-full text-sm">Good for small websites</div>
              </div>
              <span className="material-symbols-outlined"> psychiatry </span>
            </label>
          </li>
          <li>
            <input type="radio" id="premium_plan" value="premium_plan" className="hidden peer" {...register('plan')} />
            <label htmlFor="premium_plan" className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="block">
                <div className="w-full text-md font-semibold">Premium Plan</div>
                <div className="w-full text-sm">Good for large websites</div>
              </div>
              <span className="material-symbols-outlined"> forest </span>
            </label>
          </li>
        </ul>

        <div className="flex justify-end pt-16 gap-2">
          <Button size="md" color="blue" onClick={onNext}> Next </Button>
        </div>
      </div>
    </div>
  );
};
