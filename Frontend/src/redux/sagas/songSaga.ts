
import { call, put, takeLatest } from 'redux-saga/effects';
import { SongActionTypes } from '../actions/songTypes';
import { loadSongsSuccess, loadSongsError, addSongSuccess, addSongError, updateSongSuccess, updateSongError, 
  deleteSongSuccess, deleteSongError, getSongByIdSuccess, getSongByIdError } from '../actions/songActions';
import { Song } from '../actions/songTypes';
import ApiService from '../../redux/api/api';

//API call from api.ts
const apiService = new ApiService();
const API_URL = apiService.getApi();

function* loadSongs(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, API_URL + 'getAllSongs');
    const songs: Song[] = yield response.json();
    yield put(loadSongsSuccess(songs));
    console.log(songs)
  } catch (error) {
    yield put(loadSongsError(error));
  }
}

function* getSongById(action: any): Generator<any, void, any> {
  try {
    const response = yield call(fetch, API_URL + `getSong/${action.payload.id}`);
    const song: Song = yield response.json();
    yield put(getSongByIdSuccess(song));
  } catch (error) {
    yield put(getSongByIdError(error));
  }
}

function* addSong(action: any): Generator<any, void, any> {
  try {
    const response = yield call(fetch, API_URL + 'addSong', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    const song: Song = yield response.json();
    yield put(addSongSuccess(song));
  } catch (error) {
    yield put(addSongError(error));
  }
}

 function* updateSong(action: any): Generator<any, void, any> {
  try {
    const response = yield call(fetch, API_URL + `updateSong/${action.payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    const song: Song = yield response.json();
    yield put(updateSongSuccess(song));
  } catch (error) {
    yield put(updateSongError(error));
  }
} 

function* deleteSong(action: any): Generator<any, void, any> {
  try {
    yield call(fetch, API_URL + `deleteSong/${action.payload.id}`, {
      method: 'DELETE',
    });
    yield put(deleteSongSuccess(action.payload.id));
  } catch (error) {
    yield put(deleteSongError(error));
  }
}

export function* songSaga() {
  yield takeLatest(SongActionTypes.LOAD_SONGS, loadSongs);
  yield takeLatest(SongActionTypes.GET_SONG_BY_ID, getSongById);
  yield takeLatest(SongActionTypes.ADD_SONG, addSong);
  yield takeLatest(SongActionTypes.UPDATE_SONG, updateSong);
  yield takeLatest(SongActionTypes.DELETE_SONG, deleteSong);
}
