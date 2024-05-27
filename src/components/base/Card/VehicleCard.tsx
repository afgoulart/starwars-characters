import { v4 } from 'uuid';
import { IVehicle } from '@/types';
import { Picture } from '../Picture';
import { useRouter } from 'next/navigation';
import { BoxInfo } from '../BoxInfo';
import { getPicture } from '@/app/utils';

interface VehicleCardProps {
  contentData: IVehicle;
}

export default function VehicleCard({
  contentData: VehicleData,
}: VehicleCardProps) {
  const id =
    VehicleData.url
      .split('/')
      .filter((s) => !!s)
      .pop() || '';
  const imgSm = getPicture(id, 150, 180);
  const router = useRouter();
  return (
    <div
      className="flex flex-1 w-full h-fit hover:bg-gray-300 flex-row items-center gap-4 py-4"
      onClick={() => {
        router.push(VehicleData.url);
      }}
    >
      <Picture imgMd={imgSm} />
      <BoxInfo title={VehicleData.name} subtitle={VehicleData.model}>
        <ul className="uppercase text-gray-500 text-s">
          <li>Manufacturer - {VehicleData.manufacturer}</li>
          <li>Lengh - {VehicleData.length}</li>
          <li>Vehicle Class - {VehicleData.vehicle_class}</li>
          <li>Crew - {VehicleData.crew}</li>
        </ul>
      </BoxInfo>
    </div>
  );
}
