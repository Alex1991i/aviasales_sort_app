import { Alert, Spin } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import TicketCard from '../ticket-card/ticket-card';

import classes from './ticket-list.module.scss';

const TicketList = () => {
  const [countView, setCountView] = useState(5);
  const tickets = useSelector((state) => state.tickets.tickets);
  const loading = useSelector((state) => state.tickets.status);
  const transfer = useSelector((state) => state.tickets.transferFilter);

  const sortTransferTickets = (tickets, transfer) => {
    return tickets.filter(
      (el) => transfer.includes(el.segments[0].stops.length) || transfer.includes(el.segments[1].stops.length)
    );
  };

  const viewTickets = sortTransferTickets(tickets, transfer).slice(0, countView);
  const elements = viewTickets.map((ticket, i) => <TicketCard ticket={ticket} key={i} />);
  const noTickets = viewTickets.length ? null : (
    <Alert className={classes.alert} message="Рейсов, подходящих под заданные фильтры, не найдено" type="warning" />
  );
  const spinner =
    loading && !noTickets ? (
      <div className={classes.spin}>
        <Spin tip="Загрузка билетов" size="large">
          <div className="content" />{' '}
        </Spin>
      </div>
    ) : null;

  const showMore = () => {
    setCountView((countView) => countView + 5);
  };

  return (
    <div className={classes.container}>
      {spinner}
      {elements}
      {noTickets || (
        <button className={classes.btn} onClick={showMore}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
        </button>
      )}
    </div>
  );
};

export default TicketList;
