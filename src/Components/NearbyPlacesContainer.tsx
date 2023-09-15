import { usePlacesStore } from '@/store/places';
import React, { useEffect } from 'react';
import { useState } from 'react';
import SingleNearbyPlace from './SingleNearbyPlace';
import styled from 'styled-components';

interface NearbyPlacesContainer {
  currPage: number;
  elementsPerPage: Number;
}
const PlacesContainer = styled.div`
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 24px;
  width: 100%;
  @media (min-width: 768px) {
    margin-bottom: 40px;
    margin-top: 32px;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: auto;
  }
  @media (min-width: 1201px) {
    margin-top: 40px;
    margin-bottom: 48px;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 80%;
  }
`;
const NearbyPlacesContainer = ({
  currPage,
  elementsPerPage,
}: NearbyPlacesContainer) => {
  const { places } = usePlacesStore();
  console.log('CurrPage: ', currPage);
  const [lastIndex, setLastIndex] = useState<number>(
    Number(elementsPerPage) * Number(currPage)
  );
  console.log('LastIndex: ', lastIndex);
  const firstIndex = Number(lastIndex) - Number(elementsPerPage);
  console.log('firstIndex: ', firstIndex);
  const temporalPlaces = places?.slice(firstIndex, lastIndex);

  useEffect(() => {
    setLastIndex(Number(elementsPerPage) * Number(currPage));
  }, [currPage, elementsPerPage]);
  return (
    <PlacesContainer>
      {temporalPlaces &&
        temporalPlaces.map((place, index) => {
          return (
            <SingleNearbyPlace
              key={place.reference}
              place={place}
              index={index}
            />
          );
        })}
    </PlacesContainer>
  );
};

export default NearbyPlacesContainer;
