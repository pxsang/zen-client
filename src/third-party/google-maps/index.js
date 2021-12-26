import axios from 'axios';

const serialize = options => {
  let params = [];

  for (var p in options) {
    if (options.hasOwnProperty(p)) {
      params.push(encodeURIComponent(p) + '=' + encodeURIComponent(options[p]));
    }
  }
  return params.join('&');
};

const GOOGLE_API_KEY = 'AIzaSyD7Jj_OhSYIWgrBLNDS0ILeaI-sWnGid_Q';
const GOOGLE_PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const GOOGLE_GEOCODE_API_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode';

const searchOptions = {
  key: GOOGLE_API_KEY,
  location: '10.7721148,106.6960844',
  radius: 50000,
  language: 'vi',
  strictbounds: true,
};

export const geocode = async (lat, lng) => {
  const params = {
    latlng: `${lat},${lng}`,
    key: GOOGLE_API_KEY,
  };

  const queryString = serialize(params);

  const apiUrl = `${GOOGLE_GEOCODE_API_BASE_URL}/json?${queryString}`;

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

export const autocomplete = async (query, currentLocation) => {
  const params = {
    ...searchOptions,
    input: query,
  };

  if (currentLocation) {
    params.origin = `${currentLocation.latitude},${currentLocation.longitude}`;
  }

  const queryString = serialize(params);

  const apiUrl = `${GOOGLE_PLACES_API_BASE_URL}/autocomplete/json?${queryString}`;

  try {
    const response = await axios.request({
      method: 'get',
      url: apiUrl,
    });

    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const details = async placeId => {
  const params = {
    key: GOOGLE_API_KEY,
    place_id: placeId,
  };

  const queryString = serialize(params);

  const apiUrl = `${GOOGLE_PLACES_API_BASE_URL}/details/json?${queryString}`;

  try {
    const response = await axios.request({
      method: 'get',
      url: apiUrl,
    });

    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
};
