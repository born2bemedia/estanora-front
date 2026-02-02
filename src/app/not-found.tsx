import { NextIntlClientProvider } from "next-intl";

import { NotFoundSection } from "@/features/not-found/ui/NotFoundSection/NotFoundSection";

import { Footer } from "@/shared/ui/components/footer/Footer";
import { Header } from "@/shared/ui/components/header/Header";

const NotFound = () => {
  return (
    <>
    <NextIntlClientProvider>
      <Header />
      <NotFoundSection />
      <Footer />
    </NextIntlClientProvider>
    </>
  );
}

export default NotFound;