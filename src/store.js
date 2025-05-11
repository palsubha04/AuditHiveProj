import { configureStore } from '@reduxjs/toolkit';
import datasetsReducer from './slice/datasetsSlice';

const store = configureStore({
  reducer: {
    datasets: datasetsReducer,
  },
});

export default store;