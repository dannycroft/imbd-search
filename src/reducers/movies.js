import {
  FETCH_MOVIES,
  RECEIVED_MOVIES,
  ADD_MOVIE,
  COMPLETED_FETCH_MOVIES,
  SHOW_MOVIE_DETAIL,
  HIDE_MOVIE_DETAIL,
} from '../constants';

const initialState = {
  isLoading: false,
  isComplete: false,
  hasSelected: false,
  hasResults: false,
  hasError: false,
  token: null,
  results: [],
  selected: null,
  error: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        isLoading: true,
        isComplete: false,
        hasSelected: false,
      };

    case RECEIVED_MOVIES:
      return {
        ...state,
        isLoading: false,
        token: action.token,
        results: action.payload,
        hasResults: action.payload.length > 0,
        isComplete: action.payload.length < 1
      };

    case ADD_MOVIE:
      return {
        ...state,
        results: [...state.results, ...action.payload],
      };

    case COMPLETED_FETCH_MOVIES:
      return {
        ...state,
        isComplete: true,
      };

    case SHOW_MOVIE_DETAIL:
      const selected = state.results.filter(r => r.id === action.id);
      return {
        ...state,
        hasSelected: selected.length > 0,
        selected: selected.length ? selected.pop() : null,
      };

    case HIDE_MOVIE_DETAIL:
      return {
        ...state,
        hasSelected: false,
        selected: null,
      };

    default:
      return state;
  }
}
