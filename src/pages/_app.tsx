import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { MantineProvider } from "@mantine/core";

import { api } from "~/utils/api";
import "@mantine/core/styles.css";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <Component {...pageProps} />
        <Toaster />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
