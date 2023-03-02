import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import aviasalesService from '../../services/aviasales-service';
import { fetchTickets } from '../../store/tickets-slice';
import AsideFilter from '../aside-filter/aside-filter';
import ErrorBoundry from '../error-boundry/error-boundry';
import HeaderFilter from '../header-filter/header-filter';
import TicketList from '../ticket-list/ticket-list';

import classes from './app.module.scss';

const App = () => {
  const [searchId, setSearchId] = useState(null);

  const dispatch = useDispatch();
  const flag = useSelector((state) => state.tickets.flag);

  useEffect(() => {
    aviasalesService.getSearchId().then(setSearchId);
  }, []);

  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId));
    }
  }, [flag, searchId, dispatch]);

  return (
    <ErrorBoundry>
      <div className={classes.container}>
        <HeaderFilter />
        <AsideFilter />
        <TicketList />
      </div>
    </ErrorBoundry>
  );
};

export default App;
