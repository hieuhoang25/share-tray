import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';

export const metadata: Metadata = {
  title: 'Share Tray',
  description: 'Authentic Vietnamese food discovery & shared dining tables',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body className="min-h-full flex flex-col items-center bg-[#0d0e10] antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="w-full max-w-[480px] min-h-screen flex flex-col bg-ink shadow-2xl relative">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
