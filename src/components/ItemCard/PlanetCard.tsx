import { IPlanet } from '@/types';
import { BoxInfo } from '../base/BoxInfo';

interface PlanetCardProps {
  contentData: IPlanet;
}

export default function Planet({ contentData: planetData }: PlanetCardProps) {
  return (
    <BoxInfo title={planetData.name} subtitle={planetData.terrain}>
      <ul className="uppercase text-gray-500 text-s">
        <li>Population - {planetData.population}</li>
        <li>Gravity - {planetData.gravity}</li>
        <li>Rotation Period - {planetData.rotation_period}</li>
        <li>Surface Water - {planetData.surface_water}</li>
      </ul>
    </BoxInfo>
  );
}
