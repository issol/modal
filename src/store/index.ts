// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit';

// ** Reducers

import modal from './modal';

export const store = configureStore({
  reducer: {
    modal,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
