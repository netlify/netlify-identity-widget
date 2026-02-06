import { createContext } from "preact";
import type { Store } from "./types";

export const StoreContext = createContext<Store | null>(null);
