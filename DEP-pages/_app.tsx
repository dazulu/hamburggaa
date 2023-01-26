import Head from 'next/head';
import type { AppProps } from 'next/app';
import '@/styles/global.scss';
import '@/styles/variables.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="build-time" content={new Date().toString()} />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
