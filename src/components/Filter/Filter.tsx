'use client';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';
import { ResourcesMap, ResourcesType, ResourcesKeysType } from '../../types';

interface FilterProps {
  searchParams: {
    filter: string;
  };
}

const FILTERS = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles',
];

export default function Filter({ searchParams }: FilterProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);
  const [filterSelected, setFilterSelected] = useState<string>('');
  const router = useRouter();

  const filters = FILTERS.reduce((acc, k: string) => {
    return acc.concat({
      name: ResourcesMap[k],
      value: k,
    });
  }, [] as { name: string; value: string }[]);

  const handleVisible = (state: boolean) => {
    setOpen(state);
  };

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const value: string = e.currentTarget.text;
    setOpen(false);
    setFilterSelected(value);
    router.push(`?filter=${value.toLowerCase()}`);
  };

  useEffect(() => {
    const f = searchParams?.filter;
    setFilterSelected(ResourcesMap[f]);
    setHasValue(!!filterSelected);
  }, [filterSelected, searchParams]);

  return (
    <div className="w-full p-5 pb-0 flex flex-row content-center items-center md:items-center gap-3 ">
      <label className="hidden md:flex ">Filter By:</label>
      <div className="relative">
        <div className="h-10 bg-white flex border-b flex-row border-gray-200 rounded items-center">
          <input
            defaultValue={filterSelected}
            name="select"
            id="select"
            onFocus={() => handleVisible(true)}
            className="px-4 appearance-none outline-none text-gray-800 w-full"
          />

          <button
            className={classnames(
              'outline-none',
              'cursor-pointer',
              'focus:outline-none',
              'transition-all',
              'md:hidden',
              'text-gray-300',
              'hover:text-gray-600',
              {
                hidden: !hasValue,
              }
            )}
            onClick={() => {
              setFilterSelected('');
              setOpen(false);
              router.push(location.pathname);
            }}
          >
            <svg
              className="w-4 h-4 mx-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <label
            className={classnames(
              'cursor-pointer',
              'outline-none',
              'focus:outline-none',
              'border-gray-200',
              'transition-all',
              'text-gray-300',
              'hover:text-gray-600',
              {
                'rotate-180': !open,
                'border-l': open,
                'border-r': !open,
              }
            )}
            onClick={() => handleVisible(!open)}
          >
            <svg
              className={classnames('w-4 h-4 mx-2 fill-current')}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </label>
        </div>

        <input
          type="checkbox"
          name="show_more"
          id="show_more"
          className="hidden peer"
          checked={open}
          onChange={() => setOpen(true)}
        />
        <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
          {filters.map((item: any, idx: number) => {
            return (
              <div key={idx} className="cursor-pointer group">
                <a
                  href={`?filter=${item.value}`}
                  onClick={handleSelect}
                  className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"
                >
                  {item.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-10 flex-1 flex justify-end ">
        <button
          className="bg-white border p-2 uppercase px-14  border-gray-400 text-gray-400  font-normal hidden md:flex"
          onClick={() => {
            setFilterSelected('');
            setOpen(false);
            router.push(location.pathname);
          }}
        >
          clear all
        </button>
      </div>
    </div>
  );
}
