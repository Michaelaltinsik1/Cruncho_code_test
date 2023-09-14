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
  cursor: pointer;
  box-shadow: 0px 3px 8px 0px #e0f2f1;
  background-color: #fafafa;
  &:hover {
    background-color: #e0f2f1;
  }
  &:active {
    background-color: #b2dfdb;
  }
`;

const PlacesHeader = styled.h2`
  text-align: center;
  color: #212121;
  font-size: 24px;
  margin-bottom: 16px;
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
