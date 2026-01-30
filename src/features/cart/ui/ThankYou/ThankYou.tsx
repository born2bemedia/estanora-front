import styles from "./ThankYou.module.scss";

import { Link } from "@/i18n/navigation";

export const ThankYou = () => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Thank you for your order</h1>
      <p className={styles.text}>
        We have received your order and will send you payment instructions and details shortly.
      </p>
      <Link href="/account" className={styles.link}>
        Go to my account
      </Link>
    </div>
  );
};
