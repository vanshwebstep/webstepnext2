import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferTopbar from "@/components/OfferTopbar";

export const metadata = {
  metadataBase: new URL("https://webstepsolutions.com"),
  title: "Web Development Company & Hire Developers | Webstep Solutions",
  description: "Custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Hire dedicated developers monthly. Request a quote.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "https://webstepsolutions.com/webstepassets/img/favicon.png", type: "image/png" },
    ],
    shortcut: ["https://webstepsolutions.com/webstepassets/img/favicon.png"],
    apple: [{ url: "https://webstepsolutions.com/webstepassets/img/favicon.png" }],
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
