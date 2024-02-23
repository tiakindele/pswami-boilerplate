import { Toast } from 'flowbite-react';
import { toast } from 'react-hot-toast';

export const success = (text: string) => {
  toast.custom((t) => (
    <Toast className="border dark:border-gray-600">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <span className="material-symbols-outlined">check</span>
      </div>
      <div className="ml-3 text-sm font-normal">{text}</div>
      <Toast.Toggle />
    </Toast>
  ));
}

export const error = (text: string) => {
  toast.custom((t) => (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <span className="material-symbols-outlined">error</span>
      </div>
      <div className="ml-3 text-sm font-normal">{text}</div>
      <Toast.Toggle />
    </Toast>
  ));
}
