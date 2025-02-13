import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/providers/auth-provider";
import ThemeProvider from "@/providers/theme-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Help Us",
  description: "Gestionnaire de dons en ligne",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AntdRegistry>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
