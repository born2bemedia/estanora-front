import React from "react";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getPolicy } from "@/features/policies/api/get-policy";
import { PolicyRenderer } from "@/features/policies/ui/renderer/PolicyRenderer";

import st from "./page.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const policy = await getPolicy({ slug: slug, locale });
  const pageTitle = `${policy.title}`;
  return {
    title: pageTitle,
    description: policy.seo_description,
    openGraph: {
      title: pageTitle,
      description: policy.seo_description,
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
  const policy = await getPolicy({ slug: slug, locale });
  console.log(policy.content.root.children);
  let lastUpdatedDate: string | null = null;

  if (policy.last_updated) {
    try {
      const lastUpdated = new Date(policy.last_updated);
      if (!isNaN(lastUpdated.getTime())) {
        lastUpdatedDate = lastUpdated.toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  }

  return (
    <>
      <section className={st.postTitle}>
        <div className="container">
          <div className={st.postTitle__content}>
            <h1>{policy.title}</h1>
            {lastUpdatedDate && (
              <p>
                {t("last-updated", { fallback: "Last updated:" })}:{" "}
                {lastUpdatedDate}
              </p>
            )}
          </div>
        </div>
      </section>
      {policy.content && (
        <section className={st.postContent}>
          <div className="container">
            <div className={st.postContent__content}>
              <PolicyRenderer content={policy.content.root.children} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
