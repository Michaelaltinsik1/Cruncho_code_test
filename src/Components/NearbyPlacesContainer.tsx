import { usePlacesStore } from '@/store/places';
import React from 'react';

import SingleNearbyPlace from './SingleNearbyPlace';
import styled from 'styled-components';

const PlacesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 24px;
  @media (min-width: 768px) {
    margin-top: 32px;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media (min-width: 1201px) {
    margin-top: 40px;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;
const NearbyPlacesContainer = () => {
  const { places } = usePlacesStore();

  return (
    <PlacesContainer>
      {places &&
        places.map((place, index) => {
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
