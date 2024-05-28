import { IStarship } from '@/types';
import { BoxInfo } from '../base/BoxInfo';

interface StarshipCardProps {
  contentData: IStarship;
}

export default function StarshipCard({ contentData }: StarshipCardProps) {
  return (
    <BoxInfo title={contentData.name} subtitle={contentData.model}>
      <ul className="uppercase text-gray-500 text-s">
        <li>Manufacturer - {contentData.manufacturer}</li>
        <li>Class - {contentData.starship_class}</li>
        <li>Passengers - {contentData.passengers}</li>
        <li>Consumables - {contentData.consumables}</li>
      </ul>
    </BoxInfo>
  );
}
