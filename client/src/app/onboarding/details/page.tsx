'use client';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { useUser } from "@/services/users";
import { useOnboarding } from "@/services/onboarding";

export default function OnboardingPage() {
  const { register, getValues } = useFormContext();
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const onboarding = useOnboarding();

  const onBack = () => { router.push('/onboarding') };

  const onNext = () => {
    const data: any = getValues();

    onboarding.mutateAsync(data).then(() => {
      console.log('onboarding done', data);
    }).catch((error) => {
      console.log('onboarding error', error);
    });
  };

  return (
    <div className="flex flex-col items-center md:px-12 p-4 w-full h-full">
      <h1 className="text-4xl font-medium text-gray-900 dark:text-white py-8">Tell us about yourself</h1>

      <form className="flex  w-full flex-col">
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col self-center gap-4 max-w-xs">
            <div>
              <Label className="mb-2 block" htmlFor="name" value="Your Name" />
              <TextInput id="name" type="text" required shadow {...register('name')} />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="agree" {...register('terms_and_conditions')} />
              <Label htmlFor="agree" className="flex">
                I agree with the&nbsp;
                <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  terms and conditions
                </Link>
              </Label>
            </div>
          </div>

          <div className="flex justify-end pt-16 gap-2">
            <Button size="md" color="light" onClick={onBack}>Back</Button>
            <Button size="md" color="blue" onClick={onNext}>Next</Button>
          </div>
        </div>
      </form>

    </div>
  );
};
