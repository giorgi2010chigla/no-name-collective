import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";

export type Product = {
  id: string;
  name: string;
  img: string;
  price: number;
  material: string;
};

export const products: Product[] = [
  { id: "001", name: "Hooded Object", img: p1, price: 165, material: "Heavy cotton fleece, 480gsm" },
  { id: "002", name: "Frayed Tee", img: p2, price: 75, material: "Raw-cut cotton jersey" },
  { id: "003", name: "Wide Trouser", img: p3, price: 190, material: "Wool gabardine, drape cut" },
];

export function formatEuro(price: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
