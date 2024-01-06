import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";



// components
import RootLayout from "@/app/layout";

// css
import "./globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <RootLayout>
     
      <Component {...pageProps} />
    </RootLayout>
    
  );
}

export default appWithTranslation(MyApp);
