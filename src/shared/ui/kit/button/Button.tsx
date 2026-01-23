import { cn } from "@/shared/lib/helpers/styles";

import styles from "./Button.module.scss";

import { Link } from "@/i18n/navigation";

export const Button = ({
  children,
  variant,
  url,
  type,
  service,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  variant: "white" | "black" | "bordered-black";
  url?: string;
  type: "button" | "submit" | "link";
  service?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const buttonUrl = service ? `/service-request-form?service=${service}` : url;

  return type === "link" ? (
    <Link
      href={buttonUrl ?? ""}
      className={cn(styles.button, styles[variant], styles.link)}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={cn(styles.button, styles[variant])}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
