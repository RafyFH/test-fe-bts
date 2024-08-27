import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import checklistReducer from './features/checklistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    checklist: checklistReducer,
  },
});