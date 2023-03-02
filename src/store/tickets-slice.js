import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import aviasalesService from '../services/aviasales-service';

import { checkedTransfer, sortCheapFastTickets, checkedCheapFast } from './sorted-tickets';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', (id) => aviasalesService.getTicket(id));

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    transferFilter: [0, 1, 2, 3],
    status: true,
    flag: false,
    error: null,
    filter: [
      {
        id: 1,
        label: 'Все',
        checked: true,
      },
      {
        id: 2,
        label: 'Без пересадок',
        checked: true,
      },
      {
        id: 3,
        label: '1 пересадка',
        checked: true,
      },
      {
        id: 4,
        label: '2 пересадки',
        checked: true,
      },
      {
        id: 5,
        label: '3 пересадки',
        checked: true,
      },
    ],
    sorted: [
      {
        id: 1,
        label: 'САМЫЙ ДЕШЕВЫЙ',
        checked: false,
      },
      {
        id: 2,
        label: 'САМЫЙ БЫСТРЫЙ',
        checked: false,
      },
    ],
  },
  reducers: {
    filterTransferTickets(state, action) {
      checkedTransfer(state, action);
      state.transferFilter = state.filter.slice(1, 5).map((el) => {
        if (el.checked) {
          return el.id - 2;
        }
      });
      sortCheapFastTickets(state);
    },
    filterCheapFastTickets(state, action) {
      checkedCheapFast(state, action);
      sortCheapFastTickets(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = [...state.tickets, ...action.payload.tickets];
      if (!action.payload.stop) {
        state.flag = !state.flag;
      }
      if (action.payload.stop) {
        state.status = false;
      }
    });
    builder.addCase(fetchTickets.rejected, (state) => {
      state.error = true;
      state.flag = !state.flag;
    });
  },
});

export const { filterTransferTickets, filterCheapFastTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
