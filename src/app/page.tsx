'use client';
import useGeoLocation from '@/Components/useGeolocation';
import NearbyPlacesContainer from '@/Components/NearbyPlacesContainer';
import axios from 'axios';
import React, { useState } from 'react';
import { usePlacesStore } from '@/store/places';
import { useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '@/Components/Pagination';
const ELEMENTSPERPAGE = 10;

const MainWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #bbdefb;
  @media (min-width: 768px) {
    padding: 32px;
  }
  @media (min-width: 1201px) {
    padding: 96px;
  }
`;
const PrimaryHeading = styled.h1`
  font-size: 48px;
  line-height: 1;
  margin-bottom: 24px;
`;

const Coordinates = styled.p`
  font-size: 24px;
  line-height: 2rem;
  margin-bottom: 8px;
`;
export default function Home() {
  const { places, setPlaces } = usePlacesStore();
  const [pages, setPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const location = useGeoLocation();

  const calculateTotalPages = (totalElements: number): number => {
    return Math.ceil(totalElements / ELEMENTSPERPAGE);
  };
  const displayCoordinates = () => {
    if (location.loaded) {
      if (location.coordinates.lat && location.coordinates.lng) {
        return (
          <Coordinates>
            Lat: {location.coordinates.lat} Lng: {location.coordinates.lng}
          </Coordinates>
        );
      } else {
        return <p>Error: {location.error?.message}</p>;
      }
    }
    return <p>location data is not available yet</p>;
  };
  useEffect(() => {
    const handleFetch = async () => {
      if (location.coordinates.lat && location.coordinates.lng) {
        try {
          const response = await axios.post('/api/places', {
            body: {
              location: `${location.coordinates.lat},${location.coordinates.lng}`,
              radius: '6000',
              type: 'restaurant',
            },
          });

          setPlaces(response.data.data.results);
          if (response.data.data.results) {
            setPages(calculateTotalPages(response.data.data.results.length));
            setCurrPage(1);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleFetch();
  }, [location, setPlaces]);

  return (
    <MainWrapper>
      <PrimaryHeading>Nearby places finder</PrimaryHeading>
      {displayCoordinates()}

      {places && (
        <NearbyPlacesContainer
          currPage={currPage}
          elementsPerPage={ELEMENTSPERPAGE}
        />
      )}

      {pages > 0 && (
        <Pagination
          currPage={currPage}
          totalPages={pages}
          setCurrPage={setCurrPage}
        />
      )}
    </MainWrapper>
  );
}
