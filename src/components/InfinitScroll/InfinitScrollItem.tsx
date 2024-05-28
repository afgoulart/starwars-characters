'use client';

import { useRouter } from 'next/navigation';
import { getPicture } from '@/app/utils';
import { ResourcesKeysType, ResultsAPIType } from '@/types';
import { Card } from '@/components/base/Card';
import { useMemo } from 'react';
import FilmCard from '../ItemCard/FilmCard';
import PeopleCard from '../ItemCard/PeopleCard';
import PlanetCard from '../ItemCard/PlanetCard';
import SpecieCard from '../ItemCard/SpecieCard';
import StarshipCard from '../ItemCard/StarshipCard';
import VehicleCard from '../ItemCard/VehicleCard';

interface InfiniteScrollItemProps {
  item: ResultsAPIType;
  resource: ResourcesKeysType;
}

export const InfiniteScrollItem = ({
  item,
  resource,
}: InfiniteScrollItemProps) => {
  const data = useMemo(() => ({ ...item }), [item]);
  const router = useRouter();
  const id =
    data.url
      .split('/')
      .filter((s) => !!s)
      .pop() || '';
  const imgSm = getPicture(`${resource}-${id}`, 150, 180);

  return (
    <Card
      img={imgSm}
      onClick={() => {
        router.push(data.url);
      }}
    >
      {resource === 'planets' && <PlanetCard contentData={data as any} />}
      {resource === 'films' && <FilmCard contentData={data as any} />}
      {resource === 'vehicles' && <VehicleCard contentData={data as any} />}
      {resource === 'starships' && <StarshipCard contentData={data as any} />}
      {resource === 'people' && <PeopleCard contentData={data as any} />}
      {resource === 'species' && <SpecieCard contentData={data as any} />}
    </Card>
  );
};
