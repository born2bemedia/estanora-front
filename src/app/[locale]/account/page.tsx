import { AccountPage } from "@/features/account";

import styles from "./page.module.scss";

export default function AccountRoutePage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <AccountPage />
      </div>
    </section>
  );
}
