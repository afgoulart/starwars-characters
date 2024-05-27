import { API_BASE_URL_CLIENT } from '../config';
import { ResourcesKeysType, ResultAPIType, ResultsAPItype } from '../types';
import { FilterApp } from '../components/Filter';
import { ReactNode } from 'react';
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
  const resource: ResourcesKeysType = searchParams?.filter as ResourcesKeysType;
  // const { name } = props.searchParams || {};
  const req = await fetch(`${API_BASE_URL_CLIENT}/${resource || 'planets'}`, {
    cache: 'no-store',
  });

  const data: ResultAPIType = await req.json();
  const contentList: ResultsAPItype = data.results;

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

      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5">
        <ISProvider data={contentList} resource={resource}>
          <InfiniteScroll
            initialItems={contentList}
            initialPage={1}
            totalPage={data.count}
            limit={10}
            nextPage={data.next}
            prevPage={data.previous}
            resource={resource}
          />
        </ISProvider>
      </div>

      {children}
    </main>
  );
}
