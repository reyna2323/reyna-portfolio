import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a0a22",
};

const description =
  "Reyna Patel: undergraduate researcher at the USC Viterbi Interaction Lab building wearable-data pipelines, physiological ML, and human-centered research for a socially assistive robot. USC Computer Engineering & Computer Science, class of 2028.";

/* Link previews need the site's full public address. NEXT_PUBLIC_SITE_URL
   overrides it (e.g. for a preview deploy); otherwise it's the real domain. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reynapatel.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Reyna Patel's Website",
  description,
  authors: [{ name: "Reyna Patel", url: "https://github.com/reyna2323" }],
  openGraph: {
    type: "website",
    siteName: "Reyna Patel",
    title: "Reyna Patel · researcher @ USC Interaction Lab",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Reyna Patel · researcher @ USC Interaction Lab",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
