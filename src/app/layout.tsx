import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

import { ApiProvider } from "@/contexts/ApiContext";

import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "3x3 MORÓN 2025",
  description: "La 5ᵃ edición del torneo más refrescante del verano",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body>
        <ApiProvider>{children}</ApiProvider>
        <Analytics />
      </body>
    </html>
  );
}
