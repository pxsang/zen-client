import axios from 'axios';

const API_KEY = '9MnvRZxBm1WzFQFUU5fwllYCFleueKrnbBDW6HLm';
const GOOONG_PLACES_API_BASE_URL = 'https://rsapi.goong.io/Place';
const GOOONG_GEOCODE_API_BASE_URL = 'https://rsapi.goong.io/Geocode';

const serialize = options => {
  let params = [];

  for (var p in options) {
    if (options.hasOwnProperty(p)) {
      params.push(encodeURIComponent(p) + '=' + encodeURIComponent(options[p]));
    }
  }
  return params.join('&');
};

const searchOptions = {
  api_key: API_KEY,
  location: '10.7721148,106.6960844',
  limit: 5,
  radius: 50000,
};

export const autocomplete = async (query, currentLocation) => {
  const params = {
    ...searchOptions,
    input: query,
  };

  if (currentLocation) {
    params.location = `${currentLocation.latitude},${currentLocation.longitude}`;
  }

  const queryString = serialize(params);

  const apiUrl = `${GOOONG_PLACES_API_BASE_URL}/AutoComplete?${queryString}`;

  try {
    const response = await axios.request({
      method: 'get',
      url: apiUrl,
    });

    if (response) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const details = async placeId => {
  const params = {
    api_key: API_KEY,
    place_id: placeId,
  };

  const queryString = serialize(params);

  const apiUrl = `${GOOONG_PLACES_API_BASE_URL}/Detail?${queryString}`;

  try {
    const response = await axios.request({
      method: 'get',
      url: apiUrl,
    });

    if (response) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const geocode = async (lat, lng) => {
  const params = {
    latlng: `${lat},${lng}`,
    api_key: API_KEY,
  };

  const queryString = serialize(params);

  const apiUrl = `${GOOONG_GEOCODE_API_BASE_URL}?${queryString}`;

  try {
    const response = await axios.request({
      method: 'get',
      url: apiUrl,
    });

    if (response) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
};
