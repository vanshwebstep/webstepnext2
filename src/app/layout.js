import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferTopbar from "@/components/OfferTopbar";
import { IMAGE_ASSET_BASE_URL } from "@/lib/assets";

const logoIconUrl = `${IMAGE_ASSET_BASE_URL}/logo.png`;

export const metadata = {
  metadataBase: new URL("https://webstepdev.com"),
  title: "Web Development Company & Hire Developers | Webstep Solutions",
  description: "Custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Hire dedicated developers monthly. Request a quote.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [{ url: logoIconUrl, type: "image/png" }],
    shortcut: [logoIconUrl],
    apple: [{ url: logoIconUrl, type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <OfferTopbar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
