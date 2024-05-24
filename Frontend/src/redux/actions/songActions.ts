
import { Song } from './songTypes';
import { SongActionTypes } from './songTypes';

// Load songs actions
export const loadSongs = () => ({ type: SongActionTypes.LOAD_SONGS });
export const loadSongsSuccess = (songs: Song[]) => ({
  type: SongActionTypes.LOAD_SONGS_SUCCESS,
  payload: songs,
});
export const loadSongsError = (error: any) => ({
  type: SongActionTypes.LOAD_SONGS_ERROR,
  payload: error,
});

// Get single song actions
export const getSongById = (id: string) => ({
  type: SongActionTypes.GET_SONG_BY_ID,
  payload: id,
});

export const getSongByIdSuccess = (song: Song) => ({
  type: SongActionTypes.GET_SONG_BY_ID_SUCCESS,
  payload: song,
});

export const getSongByIdError = (error: any) => ({
  type: SongActionTypes.GET_SONG_BY_ID_ERROR,
  payload: error,
});


// Add song actions
export const addSong = (song: Song) => ({ type: SongActionTypes.ADD_SONG, payload: song });
export const addSongSuccess = (song: Song) => ({
  type: SongActionTypes.ADD_SONG_SUCCESS,
  payload: song,
});
export const addSongError = (error: any) => ({
  type: SongActionTypes.ADD_SONG_ERROR,
  payload: error,
});


export const updateSong = (id: string, song: Song) => ({
  type: SongActionTypes.UPDATE_SONG,
  payload: { id, song },
});

export const updateSongSuccess = (song: Song) => ({
  type: SongActionTypes.UPDATE_SONG_SUCCESS,
  payload: song,
});

export const updateSongError = (error: any) => ({
  type: SongActionTypes.UPDATE_SONG_ERROR,
  payload: error,
}); 

// Delete song actions
export const deleteSong = (songId: string) => ({ type: SongActionTypes.DELETE_SONG, payload: { id: songId } });
export const deleteSongSuccess = (songId: string) => ({
  type: SongActionTypes.DELETE_SONG_SUCCESS,
  payload: { id: songId },
});
export const deleteSongError = (error: any) => ({
  type: SongActionTypes.DELETE_SONG_ERROR,
  payload: error,
});