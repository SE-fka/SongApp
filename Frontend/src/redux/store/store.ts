
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songReducer from '../reducers/songReducer';
import { songSaga } from '../sagas/songSaga';

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
export const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable the default thunk middleware
    }).concat(sagaMiddleware),
});

// Run the songSaga
sagaMiddleware.run(songSaga);

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;