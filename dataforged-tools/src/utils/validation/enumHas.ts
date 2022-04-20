import type { EnumLike } from "@utils/types/EnumLike.js";

/**
 * Check if an enum has a specific value. Useful mainly in situations where typescript-is shouldn't be invoked, for example while debugging via ts-node or ttypescript.
 * @param enumeration - The enum object
 * @param str - The string to search for.
 * @returns True if the value is included. False if not.
 */
export function enumHas<T extends EnumLike>(enumeration: T, str: string) {
  return Object.values(enumeration).includes(str);
}

