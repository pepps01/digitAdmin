import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import store from "../src/redux/store";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import Toast from "src/components/Toast";
import DrawerCard from "src/components/DrawerCard";
import Modal from "src/components/Modal";
import Loader from "src/components/Loader";

function MyApp({ Component, pageProps, param }: any) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/");
    }
  }, [router]);

  return (
    mounted && (
      <Provider store={store}>
        <div>
          <Toast />
          <DrawerCard />
          <Modal />
          <Loader />
          <Component {...pageProps} />
        </div>
      </Provider>
    )
  );
}
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const param = context.resolvedUrl;

  return {
    props: { param },
  };
};
export default MyApp;
