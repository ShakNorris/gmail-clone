import { configureStore } from '@reduxjs/toolkit';
import mailReducer from '../features/MailSlice'
import userReducer from '../features/UserSlice'

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user : userReducer
  },
});
