import { ReactNode } from 'react';

interface BoxInfoProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function BoxInfo({ title, subtitle, children }: BoxInfoProps) {
  return (
    <div className="flex flex-col items-stretch text-left w-2/3 h-full">
      <label className="text-xl">{title}</label>
      <small className="mb-4 text-base">{subtitle}</small>

      {children}
    </div>
  );
}
