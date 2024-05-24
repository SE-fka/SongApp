
import { Song } from '../actions/songTypes';
import { SongActionTypes } from '../actions/songTypes';
import { AnyAction } from 'redux';

export interface SongState {
  songs: Song[];
  loading: boolean;
  error: any;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
};

const songReducer = (state = initialState, action: AnyAction): SongState => {
  switch (action.type) {
    case SongActionTypes.LOAD_SONGS:
      return { ...state, loading: true, error: null };
    case SongActionTypes.LOAD_SONGS_SUCCESS:
      return { ...state, songs: action.payload, loading: false };
    case SongActionTypes.LOAD_SONGS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SongActionTypes.ADD_SONG:
      return { ...state, loading: true, error: null };
    case SongActionTypes.ADD_SONG_SUCCESS:
      return { ...state, songs: [...state.songs, action.payload], loading: false };
    case SongActionTypes.ADD_SONG_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SongActionTypes.UPDATE_SONG:
      return { ...state, loading: true, error: null };
    case SongActionTypes.UPDATE_SONG_SUCCESS:
      return {
        ...state,
        songs: state.songs.map((song) => (song.id === action.payload.id ? action.payload : song)),
        loading: false,
      };
    case SongActionTypes.UPDATE_SONG_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SongActionTypes.DELETE_SONG:
      return { ...state, loading: true, error: null };
    case SongActionTypes.DELETE_SONG_SUCCESS:
      return {
        ...state,
        songs: state.songs.filter((song) => song.id !== action.payload.id),
        loading: false,
      };
    case SongActionTypes.DELETE_SONG_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default songReducer;