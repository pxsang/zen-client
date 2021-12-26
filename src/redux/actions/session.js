import {SESSION_STATUS} from '../../constants/Constants';
import SessionService from '../services/session';

export const createSession = formData => {
  return () => {
    return SessionService.createSession(formData);
  };
};

export const getSessionDetail = sessionId => {
  return dispatch => {
    dispatch({type: 'SESSION/GET_HISTORY_DETAIL_REQUEST'});
    SessionService.getSession({
      session_id: sessionId,
    }).then(response => {
      if (response) {
        dispatch({type: 'SESSION/GET_HISTORY_DETAIL_SUCCESS', data: response});
      }
    });
  };
};

export const getSessionHistory = () => {
  return dispatch => {
    dispatch({type: 'SESSION/GET_HISTORY_REQUEST'});
    SessionService.getSessionHistory({
      status: 'finished,completed',
      page: 1,
      per_page: 10,
    }).then(response => {
      if (response && response.data) {
        dispatch({type: 'SESSION/GET_HISTORY_SUCCESS', data: response.data});
      }
    });
  };
};

export const cancelSession = sessionId => {
  return dispatch => {
    return SessionService.cancelSession({session_id: sessionId}).then(
      response => {
        dispatch({type: 'SESSION/CANCELED', data: response});
      },
    );
  };
};

export const completeSession = (sessionId, rating) => {
  return dispatch => {
    return SessionService.completeSession({
      session_id: sessionId,
      rating: rating || 0,
      comment: '',
    }).then(() => {
      dispatch({type: 'SESSION/COMPLETED'});
    });

    // return SessionService.cancelSession({session_id: sessionId}).then(
    //   response => {
    //     dispatch({type: 'SESSION/CANCELED', data: response});
    //   },
    // );
  };
};

export const started = () => {
  return dispatch => {
    dispatch({type: 'SESSION/STARTED'});
  };
};

export const getSession = ({assign_session, last_updated_at, therapist_id}) => {
  return dispatch => {
    let promises = [SessionService.getSession({session_id: assign_session})];

    if (therapist_id) {
      promises.push(SessionService.getTherapist({user_code: therapist_id}));
    }

    return Promise.all(promises).then(([sessionData, therapistData]) => {
      if (sessionData) {
        let started_at =
          sessionData.status === SESSION_STATUS.STARTED
            ? new Date().getTime()
            : null;
        let accepted_at =
          sessionData.status === SESSION_STATUS.ACCEPTED
            ? new Date().getTime()
            : null;

        dispatch({
          type: 'SESSION/GET_SESSION_SUCCESS',
          data: {
            ...sessionData,
            last_updated_at,
            started_at,
            accepted_at,
            therapist: therapistData ? {...therapistData} : {},
          },
        });
      }
    });
  };
};

export const clean = () => {
  return dispatch => {
    dispatch({type: 'SESSION/CLEAN'});
  };
};
