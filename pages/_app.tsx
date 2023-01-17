import '../styles/globals.css';
import type { AppProps } from 'next/app';

import Meta from '../components/Meta';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
