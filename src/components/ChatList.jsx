import React from "react";
import logo from "./logo.png";

const ChatList = () => {
  return (
    <div className="container fixed  mt-32  flex flex-col items-center justify-center   w-72   mx-auto">
      <div className="mb-3  xl:w-96">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />

          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
      <ul className="flex flex-col">
        <li className="flex flex-row mb-2 border-gray-400">
          <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src={logo}
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
            </div>
            <div className="flex-1 pl-1 md:mr-16">
              <div className="font-medium dark:text-white">Developer</div>
            </div>
            <button className="flex justify-end w-24 text-right">
              <svg
                width="12"
                fill="currentColor"
                height="12"
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
              </svg>
            </button>
          </div>
        </li>{" "}
        <li className="flex flex-row mb-2 border-gray-400">
          <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src={logo}
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
            </div>
            <div className="flex-1 pl-1 md:mr-16">
              <div className="font-medium dark:text-white">Ceo</div>
            </div>
            <button className="flex justify-end w-24 text-right">
              <svg
                width="12"
                fill="currentColor"
                height="12"
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
              </svg>
            </button>
          </div>
        </li>{" "}
        <li className="flex flex-row mb-2 border-gray-400">
          <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src={logo}
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
            </div>
            <div className="flex-1 pl-1 md:mr-16">
              <div className="font-medium dark:text-white">Designer</div>
            </div>
            <button className="flex justify-end w-24 text-right">
              <svg
                width="12"
                fill="currentColor"
                height="12"
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ChatList;
