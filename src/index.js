import { createRoot } from 'react-dom/client';
import App from './App';
import './globals.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
