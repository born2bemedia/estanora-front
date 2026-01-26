import { Onest } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';

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
  title: 'Estanora',
  description: 'Estanora',
  openGraph: {
    title: 'Estanora',
    description: 'Estanora',
    //images: 'https://estanora.com/images/meta.png',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <GoogleAnalytics gaId="G-3YYDLYWTE4" />
      <body className={cn(onest.variable)}>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
