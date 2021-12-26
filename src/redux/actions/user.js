import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../services/user';
import {USER_SESSION_STATUS} from '../../constants/Constants';

export const getProfile = () => {
  return dispatch => {
    dispatch({type: 'USER/GET_PROFILE_REQUEST'});
    return UserService.getProfile()
      .then(response => {
        if (response) {
          dispatch({
            type: 'USER/GET_PROFILE_SUCCESS',
            data: response,
          });
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch({
          type: 'USER/GET_PROFILE_FAILED',
          data: error,
        });
      });
  };
};

export const login = phoneNumber => {
  return () => {
    return UserService.login({
      phone_number: phoneNumber,
      type: 'Customer',
      form_type: 'Login',
    });
  };
};

export const register = formData => {
  return dispatch => {
    dispatch({type: 'USER/SIGNUP_REQUEST'});
    return UserService.register({
      ...formData,
      type: 'Customer',
    })
      .then(async response => {
        console.log('response', response);
        await AsyncStorage.setItem('@auth_token', response.auth_token);
        dispatch({type: 'USER/SIGNUP_SUCCESS'});

        return Promise.resolve(response);
      })
      .catch(error => {
        console.log('error', error);
        dispatch({type: 'USER/SIGNUP_FAILED', data: error.message});
        return Promise.reject(error);
      });
  };
};

export const loginWithPassword = (phoneNumber, password) => {
  return dispatch => {
    dispatch({type: 'USER/LOGIN_REQUEST'});

    return UserService.loginWithPassword({
      phone_number: phoneNumber,
      password,
      type: 'Customer',
    })
      .then(async response => {
        await AsyncStorage.setItem('@auth_token', response.auth_token);
        dispatch({type: 'USER/LOGIN_SUCCESS'});

        return Promise.resolve(response);
      })
      .catch(error => {
        console.log('error', error);
        dispatch({type: 'USER/LOGIN_FAILED', data: error.message});
        return Promise.reject(error);
      });
  };
};

export const verifyOTP = (phoneNumber, code, type) => {
  return dispatch => {
    dispatch({type: 'USER/LOGIN_REQUEST', data: type});

    return UserService.verifyOTP({
      phone_number: phoneNumber,
      code_verify: code,
    })
      .then(async response => {
        if (response && response.auth_token) {
          await AsyncStorage.setItem('@auth_token', response.auth_token);
          dispatch({type: 'USER/LOGIN_SUCCESS', data: type});
        }

        return Promise.resolve(response);
      })
      .catch(error => {
        console.log('error', error);
        dispatch({type: 'USER/LOGIN_FAILED', data: error.message});
        return Promise.reject(error);
      });
  };
};

export const forgotPassword = phoneNumber => {
  return dispatch => {
    dispatch({type: 'USER/FORGOT_PASSWORD_REQUEST'});
    return UserService.forgotPassword({
      phone_number: phoneNumber,
      type: 'Customer',
      form_type: 'ForgotPassword',
    })
      .then(response => {
        if (response && response.message === 'success') {
          dispatch({type: 'USER/FORGOT_PASSWORD_SUCCESS'});

          return Promise.resolve(true);
        }

        return Promise.reject(false);
      })
      .catch(error => {
        console.log('error', error);
        dispatch({type: 'USER/FORGOT_PASSWORD_FAILED', data: error.message});
        return Promise.reject(false);
      });
  };
};

export const updateProfile = formData => {
  return dispatch => {
    return UserService.updateProfile({
      ...formData,
    })
      .then(async response => {
        console.log('response', response);
        dispatch({type: 'USER/UPDATE_PROFILE_SUCCESS', data: response});
      })
      .catch(error => {
        console.log('error', error);
      });
  };
};

export const updatePassword = formData => {
  return dispatch => {
    dispatch({type: 'USER/UPDATE_PASSWORD_REQUEST'});

    return UserService.updateProfile({
      ...formData,
    })
      .then(() => {
        dispatch({type: 'USER/UPDATE_PASSWORD_SUCCESS'});

        return Promise.resolve(true);
      })
      .catch(error => {
        console.log('error', error);
        dispatch({type: 'USER/UPDATE_PASSWORD_FAILED', data: error.message});
        return Promise.reject(false);
      });
  };
};

export const setPassword = formData => {
  return dispatch => {
    dispatch({type: 'USER/UPDATE_PASSWORD_REQUEST'});

    return UserService.setPassword({
      ...formData,
    })
      .then(() => {
        dispatch({type: 'USER/UPDATE_PASSWORD_SUCCESS'});

        return Promise.resolve(true);
      })
      .catch(error => {
        console.log('error', error);
        dispatch({type: 'USER/UPDATE_PASSWORD_FAILED', data: error.message});

        return Promise.reject(false);
      });
  };
};

export const online = () => {
  return dispatch => {
    UserService.updateProfile({
      session_status: USER_SESSION_STATUS.ONLINE,
    })
      .then(response => {
        dispatch({type: 'USER/UPDATE_PROFILE_SUCCESS', data: response});
      })
      .catch(error => {
        console.log('error', error);
      });
  };
};

export const offline = () => {
  return dispatch => {
    UserService.updateProfile({
      session_status: USER_SESSION_STATUS.OFFLINE,
    })
      .then(response => {
        dispatch({type: 'USER/UPDATE_PROFILE_SUCCESS', data: response});
      })
      .catch(error => {
        console.log('error', error);
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({type: 'USER/LOGOUT_REQUEST'});

    UserService.logout().then(() => {
      dispatch({type: 'USER/LOGOUT_SUCCESS'});
    });
  };
};

export const startSession = (lat, long) => {
  return () => {
    UserService.startSession({
      registration_token: '123abc123',
      device_info: {
        model: 'Android',
        os: 'Android',
        version: '4.0.0',
      },
      platform: 'Android',
      lat,
      long,
    });
  };
};

export const registered = () => {
  return dispatch => {
    dispatch({type: 'USER/REGISTERED'});
  };
};
