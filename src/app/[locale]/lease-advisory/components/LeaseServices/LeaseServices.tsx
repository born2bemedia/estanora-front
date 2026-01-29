"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  useOrderableServicesBlock1,
  usePurchasableServicesBlock1,
} from "@/features/services/lib/lease-advisory/first-block";
import {
  useOrderableServicesBlock2,
  usePurchasableServicesBlock2,
} from "@/features/services/lib/lease-advisory/second-block";
import {
  useOrderableServicesBlock3,
  usePurchasableServicesBlock3,
} from "@/features/services/lib/lease-advisory/third-block";
import { ServicesWrapper } from "@/features/services/ui/ServicesWrapper/ServicesWrapper";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./LeaseServices.module.scss";

export const LeaseServices = () => {
  const t = useTranslations("leaseAdvisoryServices");
  const purchasableServicesBlock1 = usePurchasableServicesBlock1();
  const orderableServicesBlock1 = useOrderableServicesBlock1();

  const purchasableServicesBlock2 = usePurchasableServicesBlock2();
  const orderableServicesBlock2 = useOrderableServicesBlock2();

  const purchasableServicesBlock3 = usePurchasableServicesBlock3();
  const orderableServicesBlock3 = useOrderableServicesBlock3();

  return (
    <section className={styles.lease_services}>
      <div className={"container"}>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {t("title", { fallback: "Our Lease Advisory Services" })}
        </motion.h2>
        <div className={styles.lease_services__content}>
          <ServicesWrapper
            purchasableServices={purchasableServicesBlock1}
            orderableServices={orderableServicesBlock1}
          />
          <ServicesWrapper
            purchasableServices={purchasableServicesBlock2}
            orderableServices={orderableServicesBlock2}
          />
          <ServicesWrapper
            purchasableServices={purchasableServicesBlock3}
            orderableServices={orderableServicesBlock3}
          />
        </div>
      </div>
    </section>
  );
};
