import type { PartialDeep } from "@utils/index.js";

/**
 * Makes a type where K and its properties are nullable.
 * @public
 */
export type PartialDeepBy<T, K extends keyof any = ""> = Omit<T, K> & PartialDeep<Pick<T, K extends keyof T ? K : never>>;
