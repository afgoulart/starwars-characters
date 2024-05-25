export enum ResourcesType {
  Films = 'films',
  People = 'people',
  Planets = 'planets',
  Species = 'species',
  Starships = 'starships',
  Vehicles = 'vehicles',
}

export enum ResourcesMapType {
  films = 'Films',
  people = 'People',
  planets = 'Planets',
  species = 'Species',
  starships = 'Starships',
  vehicles = 'Vehicles',
}

export interface PlanetListType {
  count: number,
  next: string | null,
  previous: string | null,
  results: PlanetType[]
}

export interface PlanetType {
  "name": string,
  "rotation_period": string,
  "orbital_period": string,
  "diameter": string,
  "climate": string,
  "gravity": string,
  "terrain": string,
  "surface_water": string,
  "population": string,
  "residents": string[],
  "films": string[],
  "created": string,
  "edited": string,
  "url": string[]
}

export interface FilmType { }
export interface PeopleType { }

export interface SpecieType { }
export interface StarshipType { }
export interface VehicleType { }


export type InfinitScrollItem = PlanetType | FilmType |
  PeopleType |
  SpecieType |
  StarshipType |
  VehicleType