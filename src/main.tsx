import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/normalize.css';
import './styles/app.css';
import PageProvider from './context/PageProvider.tsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageProvider>
      <App />
      <ToastContainer />
    </PageProvider>
  </React.StrictMode>,
)
