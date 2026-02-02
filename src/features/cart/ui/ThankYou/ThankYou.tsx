import { useTranslations } from "next-intl";

import styles from "./ThankYou.module.scss";


export const ThankYou = () => {
  const t = useTranslations("thankYou");
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{t("thankYou", { fallback: "Thank you for your order" })}</h1>
      <p className={styles.text}>
        {t("text1", { fallback: "Your request is in our hands. " })}<br/>
        {t("text2", { fallback: "An Estanora expert will review it and reach out soon to confirm details and guide the next steps." })}
        <br/><br/>
        {t("text3", { fallback: "We appreciate your trust in our expertise." })}
      </p>
    </div>
  );
};
