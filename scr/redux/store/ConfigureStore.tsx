import { configureStore } from '@reduxjs/toolkit';
import stepReducer from '../action/stepResultsSlice';
import backgroundReducer  from '../action/backgroundSlice';
const store = configureStore({
  reducer: {
    step: stepReducer,
    background: backgroundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
