import { getTranslations } from "next-intl/server";

import { ThankYou } from "@/features/cart/ui/ThankYou/ThankYou";
import { GuidesLoop } from "@/features/guides/ui/GuidesLoop/GuidesLoop";

import styles from "./page.module.scss";
export default async function ThankYouPage() {
  const t = await getTranslations("thankYou");
  const guidesTitle = t("guidesTitle", { fallback: "While your order is being processed, you can explore our expert resources and free guides on real estate." });
  return (
    <>
      <section className={styles.thankYou}>
        <div className="container">
          <ThankYou />
          
        </div>
      </section>
      <GuidesLoop title={guidesTitle} />
    </>
  );
}
