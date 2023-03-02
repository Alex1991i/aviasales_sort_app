import { configureStore } from '@reduxjs/toolkit';

import ticketReducer from './tickets-slice';

export default configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});
