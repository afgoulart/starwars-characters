import { ISpecie, IPlanet } from '@/types';
import { useEffect, useState } from 'react';
import { BoxInfo } from '../base/BoxInfo';

interface SpecieCardProps {
  contentData: ISpecie;
}

export default function SpecieCard({ contentData }: SpecieCardProps) {
  const [homeWorld, setHomeWorld] = useState('unknown');

  const getHomeWorld = async (url: string, ac: AbortController) => {
    return await fetch(url, { cache: 'no-store', signal: ac.signal })
      .then((data) => data.json())
      .catch((err) => {
        return {};
      });
  };

  useEffect(() => {
    let isCanceled = false;
    const ac = new AbortController();
    (async () => {
      if (isCanceled || !contentData.homeworld) return;
      try {
        const data: ISpecie = await getHomeWorld(
          `/api${contentData.homeworld}`,
          ac
        );
        setHomeWorld(data.name);
      } catch (e) {
        console.log(e);
      }
    })();

    return () => {
      isCanceled = true;
      ac.abort();
    };
  }, [contentData]);

  return (
    <BoxInfo title={contentData.name} subtitle={homeWorld}>
      <ul className="uppercase text-gray-500 text-s">
        <li>Classification - {contentData.classification}</li>
        <li>Designation- {contentData.designation}</li>
        <li>Language - {contentData.language}</li>
        <li>AVG Height - {contentData.average_height}</li>
      </ul>
    </BoxInfo>
  );
}
