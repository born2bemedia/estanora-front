import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./EmptyCart.module.scss";

const OFFERS = [
  { href: "/due-diligence", label: "Due Diligence" },
  { href: "/market-research", label: "Market Research" },
  { href: "/portfolio-services", label: "Portfolio Services" },
  { href: "/lease-advisory", label: "Lease Advisory" },
] as const;

export const EmptyCart = () => {
  const t = useTranslations("emptyCart");
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>
        {t("title", { fallback: "Your cart is empty" })}
      </h1>
      <p className={styles.text}>
        {t("text", {
          fallback:
            "You haven't added any services yet. Please check our offers:",
        })}
      </p>
      <ul className={styles.links}>
        {OFFERS.map(({ href, label }, index) => (
          <li key={index}>
            {index ! == OFFERS.length - 1 ? (
              <Button type="link" url={href} variant="bordered-black">
                {label}
              </Button>
            ) : (
              <Button type="link" url={href} variant="white">
                {label}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
