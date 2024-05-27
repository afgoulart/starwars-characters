'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourcesKeysType, ResultAPIType, ResultsAPItype } from '../../types';
import { getDataByType, useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import PlanetCard from '../base/Card/PlanetCard';
import FilmCard from '../base/Card/FilmCard';
import VehicleCard from '../base/Card/VehicleCard';

interface InfiniteScrollProps {
  totalPage: number;
  limit: number;
  initialPage?: number;
  initialItems?: ResultsAPItype;
  resource: ResourcesKeysType;
  nextPage: string | null;
  prevPage: string | null;
}

export function InfiniteScroll({
  initialPage,
  initialItems,
  nextPage,
  resource,
}: InfiniteScrollProps) {
  const [items, setItems] = useState<ResultsAPItype>(initialItems || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [page, setPage] = useState(initialPage || 1);

  const fetchData = useCallback(
    async (ac?: AbortController) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!nextPage) return false; // TODO: Return section error;

        const response = await fetch(nextPage, {
          cache: 'no-store',
          signal: ac?.signal,
        });
        const data: ResultAPIType = await response.json();
        const results: ResultsAPItype = data.results as ResultsAPItype;
        setItems((prevItems) => [...prevItems, ...results] as any);
      } catch (error) {
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [nextPage]
  );

  useEffect(() => {
    let isCanceled = false;
    const ac = new AbortController();

    setItems(initialItems || []);

    (async () => {
      if (isCanceled) return;

      await fetchData(ac);
    })();

    return () => {
      isCanceled = true;
      ac.abort();
    };
  }, [initialItems, resource]);

  return (
    <div className="flex items-stretch flex-col">
      <h1>All Characters</h1>
      <InfiniteScrollItem />
      {nextPage && (
        <button
          className="bg-white border p-4 uppercase px-14 m-auto border-black text-black  font-normal"
          onClick={() => fetchData()}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export function InfiniteScrollItem() {
  const { resource, contentList } = useInfiniteScroll() as any;

  if (!resource) return <div> loading...</div>;

  return (
    <div>
      {contentList.map((item: ResultsAPItype, idx: number) => {
        return (
          <div key={idx}>
            {resource === 'planets' && <PlanetCard contentData={item as any} />}
            {resource === 'films' && <FilmCard contentData={item as any} />}
            {resource === 'vehicles' && (
              <VehicleCard contentData={item as any} />
            )}
            {resource === 'starship' && <h1>starship</h1>}
            {resource === 'people' && <h1>people</h1>}
            {resource === 'species' && <h1>species</h1>}
          </div>
        );
      })}
    </div>
  );
}
