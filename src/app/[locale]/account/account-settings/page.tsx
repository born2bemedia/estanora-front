import { AccountSettingsPage } from "@/features/account";

import styles from "./page.module.scss";

export default function AccountSettingsRoutePage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <AccountSettingsPage />
      </div>
    </section>
  );
}
