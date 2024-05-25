import Image from "next/image";
import styles from "./page.module.css";
import { API_BASE_URL } from "@/config";
import { FilterApp } from "@/components/Filter";

// Main
//   - Filter navigation
//     - Planets/Homeworld
//   - Section
//     - Character item
//       - Image (use `https://picsum.photos/:width/:height`)
//       - Name
//       - Planet Name/Homeworld (use first item in `homeworld` <=> `http://swapi.dev/api/planets/`)

export default async function Home(props: { searchParams: any }) {
  const { planet } = props.searchParams || {};

  const Home = await (
    await fetch(`${API_BASE_URL}/planets${planet ? `/${planet}` : ""}`)
  ).json();

  return (
    <main className={styles.main}>
      <div className={styles.description}>{JSON.stringify(props)}</div>

      <div className={styles.aggregations}>
        <FilterApp />
      </div>

      <div className={styles.grid}>{JSON.stringify(Home)}</div>
    </main>
  );
}
