import styles from "./EmptyCart.module.scss";

import { Link } from "@/i18n/navigation";

const OFFERS = [
  { href: "/due-diligence", label: "Due Diligence" },
  { href: "/market-research", label: "Market Research" },
  { href: "/portfolio-services", label: "Portfolio Services" },
  { href: "/lease-advisory", label: "Lease Advisory" },
] as const;

export const EmptyCart = () => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Your cart is empty</h1>
      <p className={styles.text}>
        You haven&apos;t added any services yet. Please check our offers:
      </p>
      <ul className={styles.links}>
        {OFFERS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={styles.link}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
