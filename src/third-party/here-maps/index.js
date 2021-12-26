import axios from 'axios';

const APP_ID = 'fJesRScmkGrul4xTFZ1G';
const API_KEY = '--wqZzkGFMccvS68U4YgtDZJ9rYp2Mbvf-Q2DiYwx-c';

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
  apiKey: API_KEY,
  at: '10.7721148,106.6960844',
  lang: 'vi',
  limit: 5,
};

export const autosuggest = async (query, currentLocation) => {
  const params = {
    ...searchOptions,
    q: query,
  };

  if (currentLocation) {
    params.at = `${currentLocation.latitude},${currentLocation.longitude}`;
  }

  const queryString = serialize(params);

  const apiUrl = `https://autosuggest.search.hereapi.com/v1/autosuggest?${queryString}`;

  try {
    const response = await axios.request({
      method: 'get',
      url: apiUrl,
    });

    if (response) {
      // const { data } = response
      console.log('response.data', JSON.stringify(response.data));
    }
  } catch (e) {
    console.log(e);
  }
};
