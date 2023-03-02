import { useDispatch, useSelector } from 'react-redux';

import { filterCheapFastTickets } from '../../store/tickets-slice';

import classes from './header-filter.module.scss';

const HeaderFilter = () => {
  const filter = useSelector((state) => state.tickets.sorted);
  const dispatch = useDispatch();
  const ticketSort = (id) => dispatch(filterCheapFastTickets(id));
  const classNames = require('classnames');
  const elements = filter.map((el) => {
    const classBtn = classNames({
      [classes.active]: el.checked,
    });
    return (
      <button
        key={el.id}
        className={`${classes.filter} ${classBtn}`}
        onClick={() => {
          ticketSort(el.id);
        }}
      >
        {el.label}
      </button>
    );
  });

  return <div className={classes['filter-container']}>{elements}</div>;
};

export default HeaderFilter;
