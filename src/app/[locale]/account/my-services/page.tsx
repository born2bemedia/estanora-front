import { MyServicesPage } from "@/features/account";

import styles from "./page.module.scss";

export default function MyServicesRoutePage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <MyServicesPage />
      </div>
    </section>
  );
}
