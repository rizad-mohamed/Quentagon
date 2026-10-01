import type { Metadata } from "next";
import { site } from "@/lib/site";
import localFont from "next/font/local";
import "./globals.css";
import "./showcase.css";
import "./automation.css";
import "./service-workflows.css";
import "./polish.css";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "200 800",
});
const mono = localFont({
  src: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
  variable: "--font-code",
  display: "swap",
  weight: "400",
  adjustFontFallback: false,
});
const origin = process.env.NEXT_PUBLIC_SITE_URL || site.url;
export const metadata: Metadata = {
  ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: "/" } } : {}),
  title: "Quentagon | Engineering Intelligence for Progress",
  description:
    "Custom software, web and mobile applications, applied AI, security and cloud delivery. Quentagon takes your business systems from discovery to deployment and support.",
  openGraph: {
    title: "Quentagon | Engineering Intelligence for Progress",
    description:
      "Business problems. Thoughtful software. A clear path from the first conversation to what comes next.",
    type: "website",
    ...(origin
      ? {
          images: [
            {
              url: "/brand/quentagon-social.webp",
              width: 1254,
              height: 1254,
              alt: "Quentagon silver and electric blue logo",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: origin ? "summary_large_image" : "summary",
    title: "Quentagon | Engineering Intelligence for Progress",
    ...(origin ? { images: ["/brand/quentagon-social.webp"] } : {}),
  },
  icons: { icon: "/brand/favicon.png" },
};
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem("quentagon-theme")==="dark"?"dark":"light"}catch{document.documentElement.dataset.theme="light"}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
