import { Oswald, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferTopbar from "@/components/OfferTopbar"
import { IMAGE_ASSET_BASE_URL } from "@/lib/assets";

const logoIconUrl = `${IMAGE_ASSET_BASE_URL}/logo.png`;
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  metadataBase: new URL("https://webstepdev.com"),
  title: "Webstep Solutions",
  description: "Enterprise Software Development at Scale",
  icons: {
    icon: [{ url: logoIconUrl, type: "image/png" }],
    shortcut: [logoIconUrl],
    apple: [{ url: logoIconUrl, type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${roboto.variable}`}>
      <body className="antialiased font-sans">
        <OfferTopbar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
