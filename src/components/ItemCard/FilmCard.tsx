import { IFilm } from '@/types';
import { useRouter } from 'next/navigation';
import { BoxInfo } from '../base/BoxInfo';

interface FilmCardProps {
  contentData: IFilm;
}

export default function FilmCard({ contentData }: FilmCardProps) {
  const router = useRouter();
  return (
    <BoxInfo title={contentData.title} subtitle={contentData.director}>
      <ul className="uppercase text-gray-500 text-s">
        <li>Producer - {contentData.producer}</li>
        <li>Release Date - {contentData.release_date}</li>
      </ul>
    </BoxInfo>
  );
}
