import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store/';
import App from './components/app/app';
import './font/OpenSans-Regular.ttf';
import './font/OpenSans-SemiBold.ttf';
import './index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
