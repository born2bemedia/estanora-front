"use server";

const SERVER_URL = process.env.SERVER_URL;

export const getGuides = async ({ locale = "en" }: { locale?: string }) => {
  const res = await fetch(`${SERVER_URL}/api/guides?locale=${locale}`);
  const data = await res.json();
  return data.docs.reverse();
};

export const getGuide = async ({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: string;
}) => {
  const res = await fetch(
    `${SERVER_URL}/api/guides?where[slug][in]=${slug}&locale=${locale}`,
  );
  const data = await res.json();
  return data.docs[0];
};
