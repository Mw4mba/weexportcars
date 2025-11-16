import type { Metadata } from "next";
import { Urbanist, Bebas_Neue } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { ContactFormProvider } from '@/contexts/ContactFormContext';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Lazy load non-critical components
const FloatingWhatsApp = dynamic(() => import('@/components/LazyFloatingWhatsApp'));

const Footer = dynamic(() => import('@/components/home/footer'));

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "We Export Cars | Premium Vehicle Export Services from Africa",
    template: "%s | We Export Cars"
  },
  description: "We Export Cars - Expert international vehicle export services from Africa. We handle consultation, documentation, logistics, and delivery of premium vehicles worldwide with full insurance and tracking.",
  keywords: ["we export cars", "vehicle export", "car export Africa", "international car shipping", "premium vehicle export", "car logistics", "vehicle export services"],
  authors: [{ name: "We Export Cars" }],
  creator: "We Export Cars",
  publisher: "We Export Cars",
  applicationName: "We Export Cars",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.weexportcars.africa'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "We Export Cars | Premium Vehicle Export Services from Africa",
    description: "We Export Cars - Expert international vehicle export services from Africa. Consultation, documentation, logistics & delivery worldwide.",
    url: "https://www.weexportcars.africa",
    siteName: "We Export Cars",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "We Export Cars - Premium Vehicle Export Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "We Export Cars | Premium Vehicle Export Services from Africa",
    description: "We Export Cars - Expert international vehicle export services from Africa. Consultation, documentation, logistics & delivery worldwide.",
    images: ["/og-image.png"],
    creator: "@weexportcars",
    site: "@weexportcars",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '5FuRG_F34H9u3LCE9xrUeVSixLOE0XAYmjwLy02gbr0', // Google site verification
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#d10e22" />
        <meta name="google-site-verification" content="5FuRG_F34H9u3LCE9xrUeVSixLOE0XAYmjwLy02gbr0" />
      </head>
      <body
        className={`${urbanist.variable} ${bebasNeue.variable} antialiased`}
      >
        <ContactFormProvider>
          {children}
          <FloatingWhatsApp />
        </ContactFormProvider>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
