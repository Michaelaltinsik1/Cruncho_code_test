import { calculateDistanceInKm } from '@/utils/calcDistance';
import { NearbySearchType } from '@/utils/types';
import { useLocationStore } from '@/store/locations';
import styled from 'styled-components';
interface NerbyPlaceType {
  index: number;
  place: NearbySearchType;
}

const Container = styled.a`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 12px;
  min-width: 100%;
  aspect-ratio: 5/3;
  overflow: hidden;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 3px 8px 0px #e0f2f1;
  background-color: #fafafa;
  &:hover {
    background-color: #e0f2f1;
  }
  &:active {
    background-color: #b2dfdb;
  }
  @media (min-width: 768px) {
    width: 350px;
    aspect-ratio: 1/1;
  }
  @media (min-width: 1201px) {
    width: 350px;
    aspect-ratio: 1/1;
  }
`;

const PlacesHeader = styled.h2`
  text-align: center;
  color: #212121;
  font-size: 24px;
  margin-bottom: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (min-width: 768px) {
    -webkit-line-clamp: 2;
  }
`;

const ReviewContainer = styled.div`
  color: #212121;
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
`;
const Distance = styled.p`
  color: #212121;
  text-align: center;
`;
const Address = styled.p`
  color: #212121;
  text-align: center;
  margin-bottom: 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (min-width: 768px) {
    -webkit-line-clamp: 2;
  }
`;
const SingleNearbyPlace = ({ place }: NerbyPlaceType) => {
  const { location } = useLocationStore();
  return (
    <Container
      href={`https://www.google.com/maps?q=${place.geometry.location.lat},${place.geometry.location.lng}`}
      target="_blank"
    >
      <PlacesHeader>{place.name}</PlacesHeader>
      <Address>{place.vicinity}</Address>
      {location.coordinates.lat && location.coordinates.lng && (
        <Distance>
          Distance:{' '}
          {calculateDistanceInKm(
            location.coordinates.lat,
            location.coordinates.lng,
            place.geometry.location.lat,
            place.geometry.location.lng
          )}{' '}
          km
        </Distance>
      )}
      <ReviewContainer>
        <p>Rating: {place.rating}</p>
        <p>Reviews: {place.user_ratings_total}</p>
      </ReviewContainer>
    </Container>
  );
};
export default SingleNearbyPlace;
