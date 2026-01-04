import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://energize-global.com";
const siteName = "Energize Business Group";
const siteDescription =
  "Comprehensive Solutions in Marketing, Event Management, Logistics, and Manufacturing Since 1999. Driving Growth in Saudi Arabia & MENA Region.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Energize Global",
    "Energize Business Group",
    "Marketing Saudi Arabia",
    "Event Management",
    "Logistics Solutions",
    "Manufacturing",
    "Saudi Vision 2030",
    "Business Solutions MENA",
    "Brand Management",
    "Supply Chain",
  ],
  authors: [{ name: "Energize Business Group" }],
  creator: "Energize Business Group",
  publisher: "Energize Business Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Energize Business Group Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/images/logo.png"],
    creator: "@energizeglobal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "any" },
    ],
    apple: [
      { url: "/images/logo.png", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning style={{ height: "100%" }}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="author" content="Energize Business Group" />
        <meta name="geo.region" content="SA" />
        <meta name="geo.placename" content="Saudi Arabia" />
        {/* Favicon - Explicit links for better browser support */}
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="shortcut icon" type="image/png" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              description: siteDescription,
              url: siteUrl,
              logo: `${siteUrl}/images/logo.png`,
              foundingDate: "1999",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SA",
                addressRegion: "Saudi Arabia",
              },
              sameAs: [
                "https://www.linkedin.com/company/energize-global",
                "https://twitter.com/energizeglobal",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: ["English", "Arabic"],
              },
            }),
          }}
        />
      </head>

      <body
        className={`${inter.variable} antialiased bg-gray-800 text-gray-900 h-full overflow-x-hidden`}
      >
        <div className="flex flex-col min-h-screen w-full">
          <Header lang="en" />
          <main className="flex-1 w-full overflow-visible">{children}</main>
          <Footer lang="en" />
          <FloatingButtons />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1f2937",
                color: "#fff",
                border: "1px solid #374151",
                borderRadius: "0.75rem",
                padding: "16px",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
