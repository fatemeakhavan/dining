import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import Spinner from 'Spinner';
import { ReactQueryDevtools } from 'react-query/devtools';
import GlobalLoader from './Global';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

const Root = document.getElementById('admin-root');
if (Root) {
  const LoadableApp = Loadable({
    loader: () => import('./App'),
    loading: Spinner,
  });
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <GlobalLoader />
      <LoadableApp />
      {process.env.NODE_ENV !== 'production' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>,
    Root,
  );
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
