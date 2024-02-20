import "./globals.css";

// ?Components
import FooterComponent from "@/components/FooterComponent";
import NavbarComponent from "@/components/NavbarComponent";
import SessionProvider from "@/components/NextAuthProvider";
import { EdgeStoreProvider } from "@/lib/edgestoreconfig";
import {Provider} from "@/lib/queryclientprovider"
import { ContextProvider } from "@/lib/appContext";


// !Metadata
export const metadata = {
  title: "Home",
};


export default function RootLayout({ children}) {
  return (
    
    <html lang="en">
      <body>
        <SessionProvider>
        <ContextProvider>
        <Provider>
          <EdgeStoreProvider>
              <NavbarComponent />
              {children}
              <FooterComponent />
          </EdgeStoreProvider>
          </Provider>
        </ContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
