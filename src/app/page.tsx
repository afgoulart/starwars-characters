import Image from 'next/image';
import styles from './page.module.css';
import { API_BASE_URL } from '@/config';
import { FilterApp } from '@/components/Filter';
import { PlanetList } from '@/types/planet';
import { ReactNode } from 'react';

// Main
//   - Filter navigation
//     - Planets/Homeworld
//   - Section
//     - Character item
//       - Image (use `https://picsum.photos/:width/:height`)
//       - Name
//       - Planet Name/Homeworld (use first item in `homeworld` <=> `http://swapi.dev/api/planets/`)

export default async function Home({
  children,
  ...props
}: {
  searchParams: any;
  children: ReactNode;
}) {
  const { name } = props.searchParams || {};

  const planetList: PlanetList = await (
    await fetch(`${API_BASE_URL}/planets`)
  ).json();

  return (
    <main className={styles.main}>
      <div className={styles.description}>{JSON.stringify(props)}</div>

      <div className={styles.aggregations}>
        <FilterApp />
      </div>

      <div className={styles.grid}>{JSON.stringify(planetList.result)}</div>

      {children}
    </main>
  );
}
