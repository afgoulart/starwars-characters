import { API_BASE_URL_CLIENT } from '../config';
import { InfinitScrollItemType, PlanetListType } from '../types';
import { FilterApp } from '../components/Filter';
import { ReactNode } from 'react';
import React from 'react';
import { InfiniteScroll } from '../components/InfinitScroll/InfinitScroll';

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
  console.log('>>>>>', searchParams);
  const resource = searchParams?.filter || 'planets';
  // const { name } = props.searchParams || {};
  const req = await fetch(`${API_BASE_URL_CLIENT}/${resource}`, {
    cache: 'no-store',
  });

  const planetList: InfinitScrollItemType[] = await req.json();

  return (
    <main>
      <div>
        <h1>Star Wars Characters</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <FilterApp searchParams={searchParams} />

      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <InfiniteScroll initialItems={planetList} initialPage={1}>
          {(planet) => {
            return <div>{JSON.stringify(planet)}</div>;
          }}
        </InfiniteScroll>
      </div>

      {children}
    </main>
  );
}
