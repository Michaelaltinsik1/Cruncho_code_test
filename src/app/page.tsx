'use client';
import useGeoLocation from '@/Components/useGeolocation';
import NearbyPlacesContainer from '@/Components/NearbyPlacesContainer';
import axios from 'axios';
import React, { useState } from 'react';
import { usePlacesStore } from '@/store/places';
import { useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '@/Components/Pagination';
import { SearchTypes } from '@/utils/types';
const ELEMENTSPERPAGE = 5;

const options = [
  { value: 'school', text: 'School' },
  { value: 'gym', text: 'Gym' },
  { value: 'movie_theater', text: 'Movie theater' },
  { value: 'restaurant', text: 'Restaurant' },
  { value: 'pharmacy', text: 'Pharmacy' },
  { value: 'library', text: 'Library' },
];

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

const FindNearbyTypeText = styled.p`
  font-size: 24px;
  margin-top: 16px;
`;

const TypeSelect = styled.select`
  margin-top: 4px;
  padding: 16px 12px;
  border-radius: 4px;
  font-size: 20px;
  border-right: 12px solid transparent;
`;

const SearchContainer = styled.div`
  margin: 16px 0px;
  display: flex;
  flex-direction: column;
`;
const TypeLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
`;
export default function Home() {
  const { places, setPlaces } = usePlacesStore();
  const [pages, setPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [currType, setCurrType] = useState('restaurant');
  const location = useGeoLocation();

  const renderType = () => {
    switch (currType) {
      case SearchTypes.SCHOOL:
        return 'schools';
      case SearchTypes.GYM:
        return 'gyms';
      case SearchTypes.LIBRARY:
        return 'libraries';
      case SearchTypes.MOVIE_THEATER:
        return 'movie theaters';
      case SearchTypes.PHARMACY:
        return 'pharmacies';
      case SearchTypes.RESTAURANT:
        return 'restaurants';
      default:
        return '';
    }
  };

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
              type: currType,
            },
          });
          const responseSliced = response.data.data.results.slice(0, 10);
          setPlaces(responseSliced);
          if (response.data.data.results) {
            setPages(calculateTotalPages(responseSliced.length));
            setCurrPage(1);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleFetch();
  }, [location, setPlaces, currType]);

  return (
    <MainWrapper>
      <PrimaryHeading>Nearby places finder</PrimaryHeading>
      {displayCoordinates()}
      <SearchContainer>
        <TypeLabel htmlFor="type-select">Search by</TypeLabel>
        <TypeSelect
          name="types"
          id="type-select"
          defaultValue={currType}
          onChange={(e) => setCurrType(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </TypeSelect>
      </SearchContainer>
      <FindNearbyTypeText>Looking for nearby {renderType()}</FindNearbyTypeText>
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
