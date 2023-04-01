import { Product } from "./Product";

export interface Kosar {
    id: string;
    user_id: string;
    termek: Product;
    ar: number,
    mennyiseg: number;
}