import { Kosar } from "./Kosar";

export interface Rendeles {
    id: string;
    user_id: string;
    termekek: Array<Kosar>;
    datum: number;
    osszar: number;
    cim: string;
    telefon: string;
}