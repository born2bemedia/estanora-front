import React from "react";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getGuide } from "@/features/guides/api/get-guides";
import { GuideRenderer } from "@/features/guides/ui/renderer/GuideRenderer";

import { GuidesCta } from "../components/GuidesCta/GuidesCta";
import st from "./page.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const guide = await getGuide({ slug: slug, locale });
  return {
    title: guide.seo_title,
    description: guide.seo_description,
    openGraph: {
      title: guide.seo_title,
      description: guide.seo_description,
      images: "",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const t = await getTranslations("common");
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const guide = await getGuide({ slug: slug, locale });
  console.log(guide.content.root.children);

  const SERVER_URL = process.env.SERVER_URL;

  return (
    <>
      <section
        className={st.postTitle}
        style={{
          backgroundImage: `url(${SERVER_URL}${guide?.image?.url || ""})`,
        }}
      >
        <div className="container">
          <div className={st.postTitle__content}>
            <h1>{guide.title}</h1>
          </div>
        </div>
      </section>
      {guide.content && (
        <section className={st.postContent}>
          <div className="container">
            <div className={st.postContent__content}>
              <GuideRenderer content={guide.content.root.children} />
            </div>
          </div>
        </section>
      )}
      <GuidesCta />
    </>
  );
}
