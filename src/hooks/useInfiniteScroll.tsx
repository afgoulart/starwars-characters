'use client';
import { ReactNode, createContext, useContext } from 'react';
import { IResourcesMapType, ResourcesKeysType, ResultAPIType } from '../types';

const ISContext = createContext({});

interface ISProviderProps {
  data: ResultAPIType;
  resource: ResourcesKeysType;
  children: ReactNode;
}

export const getDataByType = (resource: ResourcesKeysType, data: any) => {
  switch (resource) {
    case 'people':
      return data as IResourcesMapType['people'];
    case 'films':
      return data as IResourcesMapType['films'];
    case 'vehicles':
      return data as IResourcesMapType['vehicles'];
    case 'species':
      return data as IResourcesMapType['species'];
    case 'starships':
      return data as IResourcesMapType['starships'];
    case 'planets':
    default:
      return data as IResourcesMapType['planets'];
  }
};

export const ISProvider = ({ data, resource, children }: ISProviderProps) => {
  const props = getDataByType(resource, data.results);

  return (
    <ISContext.Provider
      value={{ resource: resource || 'planets', ...data, results: props }}
    >
      {children}
    </ISContext.Provider>
  );
};

export const useInfiniteScroll = () => useContext(ISContext);
