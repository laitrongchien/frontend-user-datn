import axios from "./axios";

const getSuggestLocations = async (inputValue: string) => {
  return await axios.get(
    `https://rsapi.goong.io/Place/AutoComplete?api_key=${process.env.NEXT_PUBLIC_GOONG_API_KEY}&input=${inputValue}`
  );
};

const getDetailLocation = async (placeId: string) => {
  return await axios.get(
    `https://rsapi.goong.io/Place/Detail?api_key=${process.env.NEXT_PUBLIC_GOONG_API_KEY}&place_id=${placeId}`
  );
};

const getDirection = async (origin: string, destination: string) => {
  return await axios.get(
    `https://rsapi.goong.io/Direction?api_key=${process.env.NEXT_PUBLIC_GOONG_API_KEY}&origin=${origin}&destination=${destination}`
  );
};

const getTripRoute = async (
  origin: string,
  destination: string,
  waypoints: string
) => {
  return await axios.get(
    `https://rsapi.goong.io/trip?api_key=${process.env.NEXT_PUBLIC_GOONG_API_KEY}&origin=${origin}&waypoints=${waypoints}&destination=${destination}`
  );
};

export const mapService = {
  getSuggestLocations,
  getDetailLocation,
  getDirection,
  getTripRoute,
};
