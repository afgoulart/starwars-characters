'use client';
import React, { useEffect, useState } from 'react';
import { ResultAPIType, ResultsAPIType } from '@/types';
import { InfiniteScrollItem } from './InfinitScrollItem';
import classNames from 'classnames';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface InfiniteScrollProps {
  totalPage: number;
  limit: number;
  initialPage?: number;
  initialItems?: ResultsAPIType[];
}

export function InfiniteScroll({ initialPage }: InfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage || 1);
  const { resource, results, next } = useInfiniteScroll() as any;
  const [items, setItems] = useState<ResultsAPIType[]>(results || []);

  const handleEffectFetchData = () => {
    let isCanceled = false;
    const ac = new AbortController();

    const fetchData = async (ac?: AbortController) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/${resource || 'people'}?page=${page}`,
          {
            signal: ac?.signal,
          }
        );
        const data: ResultAPIType = await response.json();
        const results: ResultsAPIType[] = data.results as ResultsAPIType[];
        setItems((prevItems) => [...prevItems, ...results] as any);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      if (isCanceled) return;

      await fetchData(ac);
    })();

    return () => {
      isCanceled = true;
      ac.abort();
    };
  };

  useEffect(handleEffectFetchData, [page, resource]);

  return (
    <div className="flex items-stretch flex-col pb-5">
      <h1 className="w-full px-5 pt-5 text-2xl">All Characters</h1>

      {!resource && <div> loading...</div>}

      {resource && (
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5">
          {items.map((item: ResultsAPIType, idx: number) => (
            <InfiniteScrollItem item={item} resource={resource} key={idx} />
          ))}
          {isLoading && (
            <div className="">
              <AiOutlineLoading3Quarters className="animate-spin w-4 h-4" />
            </div>
          )}
        </div>
      )}

      {next && (
        <button
          className={classNames(
            'cursor-pointer bg-white border p-4 uppercase',
            'px-14 m-auto border-black text-black  font-normal',
            { 'cursor-progress': isLoading, disabled: isLoading }
          )}
          onClick={(e) => {
            e.preventDefault;

            setPage(page + 1);
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export const urlToFilters = (resource: string, url: string) => {
  return url.replace('/?', '?').replace(/\/(.+?)\?(.*)$/g, '/?filter=$1&$2');
};
