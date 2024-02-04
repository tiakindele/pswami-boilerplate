"use client";

type Props = {
  formClassName?: string;
};

export default function SearchBar(props : Props) {
  return (
    <form className={`${props.formClassName} w-full`}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">search</span>
        </div>
        <input
          type="text"
          name="email"
          id="topbar-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search"
        />
      </div>
    </form>
  );
}
