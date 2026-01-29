import type { Metadata } from "next";

import { ContactCta, ContactMain, ContactSecond } from "./components";

export const metadata: Metadata = {
  title: 'Contact Estanora Experts',
  description: 'Have questions or need assistance with your property case? Reach out to our team today and get expert guidance.',
  openGraph: {
    title: 'Contact Estanora Experts',
    description: 'Have questions or need assistance with your property case? Reach out to our team today and get expert guidance.',
    //images: 'https://estanora.com/images/meta.png',
  },
};

export default async function ContactPage() {
  return (
    <>
      <ContactMain />
      <ContactSecond />
      <ContactCta />
    </>
  );
}
