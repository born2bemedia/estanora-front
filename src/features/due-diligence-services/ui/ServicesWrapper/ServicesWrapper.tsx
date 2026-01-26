import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";
import {
  OrderableServiceCard,
  PurchasableServiceCard,
} from "../ServiceCard/ServiceCard";
import styles from "./ServicesWrapper.module.scss";

export const ServicesWrapper = ({
  purchasableServices,
  orderableServices,
}: {
  purchasableServices: PurchasableService[];
  orderableServices: OrderableService[];
}) => {
  const t = useTranslations("dueDiligenceServices");

  return (
    <div className={styles.services_wrapper}>
      <div className={styles.services_wrapper__purchasable_services}>
        {purchasableServices.map((service) => (
          <PurchasableServiceCard key={service.id} service={service} />
        ))}
      </div>
      <div className={styles.services_wrapper__orderable_services}>
        {orderableServices.map((service) => (
          <OrderableServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
