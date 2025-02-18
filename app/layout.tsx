import type { Metadata } from "next";
import "@/styles/reset.scss";
import "@/styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { mainFont } from "@/libs/font"
import { PromptProvider } from "@/context/usePrompt";
import { SelectedProvider } from "@/context/useSelected";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mainFont.className}>
      <body
        className="layout"
      >
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <PromptProvider>
            <SelectedProvider>
              <Header />
              <main>
                <div aria-hidden="true" className="overlay" />
                {children}
              </main>
              <Footer />
            </SelectedProvider>
          </PromptProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
