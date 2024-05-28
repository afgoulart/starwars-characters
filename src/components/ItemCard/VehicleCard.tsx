import { IVehicle } from '@/types';
import { BoxInfo } from '../base/BoxInfo';

interface VehicleCardProps {
  contentData: IVehicle;
}

export default function VehicleCard({ contentData }: VehicleCardProps) {
  return (
    <BoxInfo title={contentData.name} subtitle={contentData.model}>
      <ul className="uppercase text-gray-500 text-s">
        <li>Manufacturer - {contentData.manufacturer}</li>
        <li>Lengh - {contentData.length}</li>
        <li>Vehicle Class - {contentData.vehicle_class}</li>
        <li>Crew - {contentData.crew}</li>
      </ul>
    </BoxInfo>
  );
}
