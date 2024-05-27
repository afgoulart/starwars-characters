import { v4 } from 'uuid';
import { IPlanet } from '@/types';
import { Picture } from '../Picture';
import { useRouter } from 'next/navigation';
import { BoxInfo } from '../BoxInfo';
import { getPicture } from '@/app/utils';
import { Card } from './Card';

interface PlanetCardProps {
  contentData: IPlanet;
}

export default function Planet({ contentData: planetData }: PlanetCardProps) {
  const id =
    planetData.url
      .split('/')
      .filter((s) => !!s)
      .pop() || '';
  const imgSm = getPicture(id, 150, 180);
  const router = useRouter();
  return (
    <Card
      img={imgSm}
      onClick={() => {
        router.push(planetData.url);
      }}
    >
      <BoxInfo title={planetData.name} subtitle={planetData.terrain}>
        <ul className="uppercase text-gray-500 text-s">
          <li>Population - {planetData.population}</li>
          <li>Gravity - {planetData.gravity}</li>
          <li>Rotation Period - {planetData.rotation_period}</li>
          <li>Surface Water - {planetData.surface_water}</li>
        </ul>
      </BoxInfo>
    </Card>
  );
}
