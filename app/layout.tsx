import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Sidebar } from "@/components/sidebar";
import { ThemeSwitch } from "@/components/theme-switch";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="de">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex h-screen">
            <Sidebar />
            <div className="flex-grow flex flex-col h-screen overflow-y-auto relative">
              <div className="fixed bottom-4 right-4 z-50">
                <ThemeSwitch />
              </div>
              <main className="w-full flex-grow flex flex-col">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
