import axios from 'axios';
import io from 'socket.io-client';

import {
  API,
  API_ENDPOINT,
  FETCH_MOVIES,
  RECEIVED_MOVIES,
  ADD_MOVIE,
  COMPLETED_FETCH_MOVIES,
} from '../constants';

function updateClient(socket, res) {
  return function(dispatch) {
    if (res.status === 'terminated') {
      socket.disconnect();
      dispatch({ type: COMPLETED_FETCH_MOVIES });
    } else {
      dispatch({ type: ADD_MOVIE, payload: [res] });
    }
  };
}

function connect(token) {
  const socket = io.connect(API);
  return dispatch => {
    socket.on('connect', () => {
      dispatch(subscribe(socket, token));
    });
  };
}

function subscribe(socket, token) {
  return function(dispatch) {
    socket.on(`movies.${token}`, res => {
      dispatch(updateClient(socket, JSON.parse(res)));
    });
  };
}

export function fetchMovies(query) {
  const url = `${API_ENDPOINT}?query=${query}`;
  const request = axios.get(url);

  return function(dispatch) {
    dispatch({ type: FETCH_MOVIES });
    request.then(result => {
      const payload = [];
      const { data, data: { listening_token: token } } = result;

      if (data.id) payload.push(data);

      dispatch({
        type: RECEIVED_MOVIES,
        token,
        payload,
      });

      dispatch(connect(token));
    });
  };
}
