'use client';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';
import { ResourcesMapType, ResourcesType } from '../../types';

interface FilterProps {
  searchParams: {
    filter: string;
  };
}

export default function Filter({ searchParams }: FilterProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);
  const [filterSelected, setFilterSelected] = useState<string>('');
  const router = useRouter();

  const filters = Object.keys(ResourcesType).map((k) => {
    return {
      name: k,
      value: ResourcesType[k],
    };
  });

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const value = e.currentTarget.text;
    setFilterSelected(value);
    router.replace(`?filter=${ResourcesType[value]}`);
  };

  useEffect(() => {
    setHasValue(!!filterSelected);
  }, [filterSelected]);

  useEffect(() => {
    setOpen(false);
    const f = searchParams?.filter;
    setFilterSelected(ResourcesMapType[f]);
  }, [searchParams]);
  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <div className="h-10 bg-white flex border border-gray-200 rounded items-center">
          <input
            defaultValue={filterSelected}
            name="select"
            id="select"
            className="px-4 appearance-none outline-none text-gray-800 w-full"
          />

          <button
            className={classnames(
              'outline-none',
              'cursor-pointer',
              'focus:outline-none',
              'transition-all',
              'text-gray-300',
              'hover:text-gray-600',
              {
                hidden: !hasValue,
              }
            )}
            onClick={() => {
              setFilterSelected('');
              const newUrl = new URL(location.href);
              newUrl.searchParams.delete('filter');
              setOpen(false);
              router.replace(newUrl.pathname);
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
            htmlFor="show_more"
            className={classnames(
              'cursor-pointer',
              'outline-none',
              'focus:outline-none',
              'border-l',
              'border-gray-200',
              'transition-all',
              'text-gray-300',
              'hover:text-gray-600',
              {
                'rotate-180': open,
              }
            )}
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
          defaultChecked={open}
          onChange={() => setOpen(true)}
        />
        <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
          {filters.map((item, idx) => {
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
    </div>
  );
}
