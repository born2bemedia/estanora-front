import { ThankYou } from "@/features/cart/ui/ThankYou/ThankYou";

import styles from "./page.module.scss";
export default function ThankYouPage() {
  return (
    <>
      <section className={styles.thankYou}>
        <div className="container">
          <ThankYou />
        </div>
      </section>
    </>
  );
}
