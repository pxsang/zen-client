import Api from '../api/api';
import {API_VERSION, APP_URL} from '../../config';

export default {
  createSession: params => {
    return Api.post(
      API_VERSION.V1 + APP_URL.CUSTOMER + APP_URL.SESSION + '/create',
      params,
    );
  },

  getSessionHistory: params => {
    return Api.get(
      API_VERSION.V1 + APP_URL.CUSTOMER + APP_URL.SESSION + '/get_all',
      params,
    );
  },

  cancelSession: params => {
    return Api.post(
      API_VERSION.V1 + APP_URL.CUSTOMER + APP_URL.SESSION + '/cancel',
      params,
    );
  },

  completeSession: params => {
    return Api.post(
      API_VERSION.V1 + APP_URL.THERAPIST + APP_URL.SESSION + '/complete',
      params,
    );
  },

  getSession: params => {
    return Api.get(API_VERSION.V1 + APP_URL.SESSION + '/get', params);
  },

  getTherapist: params => {
    return Api.get(API_VERSION.V1 + APP_URL.USER + '/get', params);
  },
};
