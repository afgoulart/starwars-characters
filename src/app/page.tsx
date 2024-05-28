import { API_BASE_URL_CLIENT } from '../config';
import { ResourcesKeysType, ResultAPIType, ResultsAPIType } from '../types';
import { FilterApp } from '../components/Filter';
import { ReactNode, useEffect } from 'react';
import React from 'react';
import { InfiniteScroll } from '../components/InfinitScroll/InfinitScroll';
import { ISProvider } from '@/hooks/useInfiniteScroll';

// Main
//   - Filter navigation
//     - Planets/Homeworld
//   - Section
//     - Character item
//       - Image (use `https://picsum.photos/:width/:height`)
//       - Name
//       - Planet Name/Homeworld (use first item in `homeworld` <=> `http://swapi.dev/api/planets/`)

interface HomeProps {
  children: ReactNode;
  searchParams: {
    filter: string;
  };
}

export default async function Home({ children, searchParams }: HomeProps) {
  const { filter, page }: { filter: ResourcesKeysType; page?: number } =
    searchParams as any;

  // const { name } = props.searchParams || {};
  const req = await fetch(
    `${API_BASE_URL_CLIENT}/${filter || 'planets'}${
      page ? `?page=${page}` : ''
    }`,
    {
      cache: 'no-store',
    }
  );

  const data: ResultAPIType = await req.json();

  return (
    <main className="">
      <div className="border-b border-black pt-8 pb-5 px-5">
        <h1 className="text-3xl">Star Wars Characters</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <FilterApp searchParams={searchParams} />

      <ISProvider data={data} resource={filter || 'planets'}>
        <InfiniteScroll initialPage={page} totalPage={data.count} limit={10} />
      </ISProvider>

      {children}
    </main>
  );
}
