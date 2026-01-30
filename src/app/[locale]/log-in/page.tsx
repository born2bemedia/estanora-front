import { LoginForm } from "@/features/account";

import styles from "./page.module.scss";

export default function LogInPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <LoginForm />
      </div>
    </section>
  );
}
