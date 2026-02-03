import { getTranslations } from "next-intl/server";

import { LoginForm } from "@/features/account";
import { FormsCta } from "@/features/account/ui/FormsCta/FormsCta";

import styles from "./page.module.scss";

export default async function LogInPage() {
  const t = await getTranslations("accountLoginPage");
  const title = t("title", { fallback: "Need Assistance?" });
  const text1 = t("text1", { fallback: "Experiencing troubles with logging in?" });
  const text2 = t("text2", { fallback: "Our support team is here to help." });
  const description = `${text1} <br/> ${text2}`;
  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <LoginForm />
        </div>
      </section>
      <FormsCta title={title} description={description} />
    </>
  );
}
