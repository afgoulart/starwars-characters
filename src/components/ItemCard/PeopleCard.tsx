import { IPeople, IPlanet } from '@/types';
import { BoxInfo } from '../base/BoxInfo';
import { useEffect, useState } from 'react';

interface PeopleCardProps {
  contentData: IPeople;
}

export default function PeopleCard({ contentData }: PeopleCardProps) {
  const [homeWorld, setHomeWorld] = useState('');

  const getHomeWorld = async (url: string, ac: AbortController) => {
    return await fetch(url, { cache: 'no-store', signal: ac.signal })
      .then((data) => data.json())
      .catch(() => {
        return {};
      });
  };

  useEffect(() => {
    let isCanceled = false;
    const ac = new AbortController();
    (async () => {
      if (isCanceled) return;

      const data: IPlanet = await getHomeWorld(
        `/api${contentData.homeworld}`,
        ac
      );
      setHomeWorld(data.name);
    })();

    return () => {
      isCanceled = true;
      ac.abort();
    };
  }, [contentData]);

  return (
    <BoxInfo title={contentData.name} subtitle={homeWorld}>
      <ul className="uppercase text-gray-500 text-s">
        <li>Height - {contentData.height}</li>
        <li>Gender - {contentData.gender}</li>
        <li>Skin Color - {contentData.skin_color}</li>
        <li>Birth Year - {contentData.birth_year}</li>
      </ul>
    </BoxInfo>
  );
}
