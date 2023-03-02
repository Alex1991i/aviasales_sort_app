import classes from './ticket-card.module.scss';

const TicketCard = ({ ticket }) => {
  const { carrier, price, segments } = ticket;
  const elements = segments.map((segment, index) => <TicketData segment={segment} key={index} />);

  const pathImg = `https://pics.avs.io/99/36/${carrier}.png`;

  return (
    <div className={classes.container}>
      <div className={classes.price}>{`${price} Р`}</div>
      <span></span>
      <img className={classes.logo} src={pathImg} alt="logo" />
      {elements}
    </div>
  );
};

const TicketData = ({ segment }) => {
  const { origin, destination, date, duration, stops } = segment;
  const hours = new Date(date).getUTCHours();
  const minutes = new Date(date).getUTCMinutes();
  const departureTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const arrivalTime = `${String(Math.floor((hours * 60 + minutes + duration) / 60) % 24).padStart(2, '0')}:${String(
    (hours * 60 + minutes + duration) % 60
  ).padStart(2, '0')}`;

  let transfers;
  switch (stops.length) {
    case 0:
      transfers = 'БЕЗ ПЕРЕСАДОК';
      break;
    case 1:
      transfers = `${stops.length} ПЕРЕСАДКА`;
      break;
    default:
      transfers = `${stops.length} ПЕРЕСАДКИ`;
      break;
  }

  return (
    <>
      <div>
        <p className={classes.headers}>
          {origin} - {destination}
        </p>
        <p>{`${departureTime}-${arrivalTime}`}</p>
      </div>
      <div>
        <p className={classes.headers}>В ПУТИ</p>
        <p>{`${String(Math.floor(duration / 60)).padStart(2, '0')}ч ${String(duration % 60).padStart(2, '0')}м`}</p>
      </div>
      <div>
        <p className={classes.headers}>{transfers}</p>
        <p>{stops.join(', ')}</p>
      </div>
    </>
  );
};

export default TicketCard;
