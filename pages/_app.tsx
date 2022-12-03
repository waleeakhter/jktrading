
import "primereact/resources/themes/lara-light-teal/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import '../styles/globals.scss'
import { Session } from "next-auth";
import type { AppProps } from 'next/app'
import PrimeReact from 'primereact/api';
import { HotKeys } from "react-hotkeys";
import SellingModal from "../components/Modal/SellingModal";
import { SessionProvider } from "next-auth/react";

PrimeReact.ripple = true;
const keyMap = {
  SNAP_LEFT: "command+left",
  DELETE_NODE: ["del", "backspace"]
};

function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>

  )
}

export default MyApp
