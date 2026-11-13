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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Web Development Company & Hire Developers | Webstep Solutions",
    description: "Custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Hire dedicated developers monthly. Request a quote.",
    url: "https://webstepsolutions.com",
    siteName: "Webstep Solutions",
    images: [
      {
        url: "https://webstepsolutions.com/webstepassets/img/logo.png",
        width: 1200,
        height: 630,
        alt: "Webstep Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Company & Hire Developers | Webstep Solutions",
    description: "Custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Hire dedicated developers monthly. Request a quote.",
    images: ["https://webstepsolutions.com/webstepassets/img/logo.png"],
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
