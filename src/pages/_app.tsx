"use client";
import "../assets/styles/style.css";
import "../assets/styles/Common.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Layouts from "../components/Layouts";
import { wrapper } from "../redux/reducers/store";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { LoaderProvider, useLoader } from "../Context/LoaderContext";
import { Loader } from "../components/Loader";
import { SSRProvider } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";


const NotificationContainer = dynamic(
  () => import("react-notifications").then((m) => m.NotificationContainer),
  { ssr: false }
);

const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => m.ToastContainer),
  { ssr: false }
);
// Dynamically load to avoid SSR hydration mismatches


function LoaderWrapper() {
  const router = useRouter();
  const { setLoading } = useLoader();

  const previousPath = useRef<string>(router.asPath);
  const startTime = useRef<number>(0);
  const startTimer = useRef<NodeJS.Timeout | null>(null);
  const forceStopTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url === previousPath.current) return;

      startTime.current = Date.now();

      startTimer.current = setTimeout(() => {
        setLoading(true);

        forceStopTimer.current = setTimeout(() => {
          setLoading(false);
        }, 5000);
      }, 100);
    };

    const handleComplete = (url: string) => {
      const loadTime = Date.now() - startTime.current;

      if (startTimer.current) clearTimeout(startTimer.current);
      if (forceStopTimer.current) clearTimeout(forceStopTimer.current);

      if (loadTime < 100) {
        setLoading(false);
        return;
      }

      setLoading(false);
      previousPath.current = url;
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      if (startTimer.current) clearTimeout(startTimer.current);
      if (forceStopTimer.current) clearTimeout(forceStopTimer.current);
    };
  }, [router]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
      <LoaderProvider>
        <LoaderWrapper />
        <Layouts>
          <Loader />
        <Component {...pageProps} />
          {/* These often cause hydration mismatches, so render client-only */}
          <NotificationContainer />
          <ToastContainer />
        </Layouts>
      </LoaderProvider>
  );
}

export default wrapper.withRedux(MyApp);
