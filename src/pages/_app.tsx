// app.tsx
import '../assets/styles/style.css';
import '../assets/styles/Common.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Layouts from '../components/Layouts';
import { wrapper } from "../redux/reducers/store";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as ga from '../lib/ga';
import { LoaderProvider, useLoader } from './LoaderContext';
import { Loader } from '../components/Loader';

function LoaderWrapper() {
  const router = useRouter();
  const { setLoading } = useLoader();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const handleStart = () => {
      timer = setTimeout(() => {
        setLoading(true);
      }, 100); // delay to avoid flashing loader
    };

    const handleComplete = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <LoaderProvider>
      <LoaderWrapper />
      <Layouts>
        <Loader />
        <Component {...pageProps} />
        <NotificationContainer />
      </Layouts>
    </LoaderProvider>
  );
}

export default wrapper.withRedux(MyApp);
