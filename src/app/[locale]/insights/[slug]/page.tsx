import React from "react";
import Image from "next/image";

import type { Metadata } from "next";

import { getPost, getPostSlugs } from "@/features/insights/insights";

import st from "./page.module.scss";

type PageParams = { locale: string; slug: string };

export async function generateStaticParams(): Promise<PageParams[]> {
  const locales = ["en", "de"];
  const params: PageParams[] = [];

  for (const locale of locales) {
    const slugs = await getPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const post = await getPost(slug, locale);
  const pageTitle = `${post.seo_title}`;
  const pageDescription = post.seo_description;
  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: "",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const post = await getPost(slug, locale);

  return (
    <>
      <section className={st.postTitle}>
        <div className="_container">
          <div className={st.postTitle__content}>
            <h1>
              {post.title}
              <br />
              {post.subtitle}
            </h1>
            <Image
              src={post.image}
              alt={post.title}
              width={1320}
              height={400}
            />
            <div className={st.postTitle__excerpt}>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt_1 }} />
              <p dangerouslySetInnerHTML={{ __html: post.excerpt_2 }} />
            </div>
          </div>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: post.body as string }} />
    </>
  );
}
