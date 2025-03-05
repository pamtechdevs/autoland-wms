import type { Metadata } from "next";

import { Providers } from "./providers";
import { AuthProvider } from "./utils/services/context";

export const metadata: Metadata = {
  title: "Pamtech Autoland Administrator",
  description: "Pamtech Autoland Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
