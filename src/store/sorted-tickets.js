const checkedTransfer = (state, action) => {
  state.filter.forEach((el) => {
    if (el.id === action.payload) {
      el.checked = !el.checked;
    }
  });
  if (state.filter[0].checked === true && action.payload === 1) {
    state.filter.forEach((el) => {
      el.checked = true;
    });
  }
  if (state.filter[0].checked === false && action.payload === 1) {
    state.filter.forEach((el) => {
      el.checked = false;
    });
  }
  if (action.payload !== 1 && state.filter[action.payload - 1].checked === false) {
    state.filter[0].checked = false;
  }
  if (
    state.filter[1].checked === true &&
    state.filter[2].checked === true &&
    state.filter[3].checked === true &&
    state.filter[4].checked === true
  ) {
    state.filter[0].checked = true;
  }
};

const checkedCheapFast = (state, action) => {
  state.sorted.forEach((el) => {
    if (el.id === action.payload) {
      el.checked = !el.checked;
    }
  });
};

const sortCheapFastTickets = (state) => {
  if (state.sorted[0].checked && state.sorted[1].checked) {
    state.tickets.sort(
      (a, b) =>
        a.price - b.price ||
        a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
    );
  }
  if (state.sorted[0].checked) {
    state.tickets.sort((a, b) => a.price - b.price);
  } else if (state.sorted[1].checked) {
    state.tickets.sort(
      (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
    );
  }
};

export { checkedTransfer, sortCheapFastTickets, checkedCheapFast };
