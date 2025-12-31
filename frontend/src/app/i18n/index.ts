import en from "./en";
import ar from "./ar";

// Languages object to easily fetch translation based on active language
export const languages = { en, ar };

// Allowed language types
export type Lang = "en" | "ar";