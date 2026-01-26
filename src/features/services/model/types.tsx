export type PurchasableService = {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  note: string;
  price: number;
};

export type OrderableService = {
  id: string;
  title: string;
  description: string;
  price: number;
  includes?: boolean;
};