import { useSelector, useDispatch } from 'react-redux';

import { filterTransferTickets } from '../../store/tickets-slice';

import classes from './aside-filter.module.scss';

const AsideFilter = () => {
  const asideFilter = useSelector((state) => state.tickets.filter);
  const dispatch = useDispatch();

  const filterCheck = (id) => dispatch(filterTransferTickets(id));

  const elements = asideFilter.map((filter) => (
    <label key={filter.id} className={classes.checkbox}>
      <input type="checkbox" checked={filter.checked} onChange={() => filterCheck(filter.id)} />
      {filter.label}
    </label>
  ));

  return (
    <div className={classes['filter-container']}>
      <h3 className={classes.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      {elements}
    </div>
  );
};

export default AsideFilter;
