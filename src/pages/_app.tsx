import '../assets/styles/style.css';
import '../assets/styles/Common.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Layouts from '../components/Layouts';
import { wrapper } from "../redux/reducers/store"
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as ga from '../lib/ga';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    
  <Layouts>
    <Component {...pageProps} /> 
    <NotificationContainer />
  </Layouts>
  )
 
}

export default wrapper.withRedux(MyApp);