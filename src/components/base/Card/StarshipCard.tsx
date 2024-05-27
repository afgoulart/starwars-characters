import { v4 } from 'uuid';
import { IPlanet } from '@/types';
import { Picture } from '../Picture';
import { useRouter } from 'next/navigation';
import { BoxInfo } from '../BoxInfo';

interface PlanetCardProps {
  planetData: IPlanet;
}

const getPicture = (id: string, width: number, height: number) => {
  return `https://picsum.photos/${width}/${height}?random=${id}`;
};

export default function PlanetCard({ planetData }: PlanetCardProps) {
  const id =
    planetData.url
      .split('/')
      .filter((s) => !!s)
      .pop() || '';
  const imgSm = getPicture(id, 150, 180);
  const router = useRouter();
  return (
    <div
      className="flex flex-1 w-full h-fit hover:bg-gray-300 flex-row items-center gap-4 py-4"
      onClick={() => {
        router.push(planetData.url);
      }}
    >
      <Picture imgMd={imgSm} />
      <BoxInfo title={planetData.name} subtitle={planetData.terrain}>
        <ul className="uppercase text-gray-500 text-s">
          <li>Population - {planetData.population}</li>
          <li>Gravity - {planetData.gravity}</li>
          <li>Rotation Period - {planetData.rotation_period}</li>
          <li>Surface Water - {planetData.surface_water}</li>
        </ul>
      </BoxInfo>
    </div>
  );
}
