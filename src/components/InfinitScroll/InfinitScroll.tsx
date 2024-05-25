'use client';
import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL_CLIENT } from '../../config';
import { InfinitScrollItemType } from '../../types';

interface InfiniteScrollProps {
  initialPage?: number;
  initialItems?: InfinitScrollItemType[];
  children: Function;
}

export function InfiniteScroll({
  children,
  initialPage,
  initialItems,
}: InfiniteScrollProps) {
  const [items, setItems] = useState<InfinitScrollItemType[]>(
    initialItems || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage || 1);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL_CLIENT}?page=${page}`);
      const data = await response.json();

      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isCanceled = false;

    (async () => {
      if (isCanceled) return;

      await fetchData();
    })();

    return () => {
      isCanceled = true;
    };
  });

  return (
    <div>
      {items.map((item) => {
        return children(item);
      })}
    </div>
  );
}
