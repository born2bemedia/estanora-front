"use client";

import { useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "../../store/cart";

import styles from "./CartNotification.module.scss";

export const CartNotification = () => {
  const notification = useCartStore((state) => state.notification);
  const clearNotification = useCartStore((state) => state.clearNotification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={styles.cart_notification}
        >
          <p>{notification.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
