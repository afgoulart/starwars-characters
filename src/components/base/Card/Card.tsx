import { ReactNode } from 'react';
import { Picture } from '../Picture';

export function Card({
  onClick,
  img,
  children,
}: {
  onClick?: Function;
  children: ReactNode;
  img: string;
}) {
  return (
    <div
      className="flex flex-1 w-full h-fit hover:bg-gray-300 flex-row items-center gap-4 py-4"
      onClick={() => {
        onClick?.();
      }}
    >
      <Picture imgMd={img} />
      {children}
    </div>
  );
}
