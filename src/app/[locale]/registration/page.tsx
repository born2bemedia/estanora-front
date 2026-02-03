import { RegistrationForm } from "@/features/account";

import styles from "./page.module.scss";

export default function RegistrationPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <RegistrationForm />
      </div>
    </section>
  );
}
