import { MyOrdersPage } from "@/features/account";

import styles from "./page.module.scss";

export default function MyOrdersRoutePage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <MyOrdersPage />
      </div>
    </section>
  );
}
