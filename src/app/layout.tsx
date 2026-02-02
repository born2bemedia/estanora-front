import { Onest } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';

import { FormsPopupRenderer } from '@/features/forms';

import { cn } from '@/shared/lib/helpers/styles';
import { Footer, Header } from '@/shared/ui/components';

import 'react-toastify/dist/ReactToastify.css';
import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Estanora | Real Estate Consulting, Market Research, Due Diligence',
  description: 'Get precise market insights, due diligence, and portfolio guidance—start protecting and growing your property today!',
  openGraph: {
    title: 'Estanora | Real Estate Consulting, Market Research, Due Diligence',
    description: 'Get precise market insights, due diligence, and portfolio guidance—start protecting and growing your property today!',
    //images: 'https://estanora.com/images/meta.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <GoogleAnalytics gaId="G-3YYDLYWTE4" />
      <body className={cn(onest.variable)}>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
          <FormsPopupRenderer />  
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
