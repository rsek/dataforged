import type { HasName } from "./HasName.js";
import type { HasString } from "./HasString.js";
import type { EnumLike } from "../types/EnumLike.js";
/**
 * It creates an error message for when a value is not present in an enum.
 * @param source - The source of the error. This can be anything with a "toString" method, or an object with a `name` property.
 * @param badItem - the bad item that was passed in
 * @param e - EnumLike
 * @returns An Error.
 */
export declare function badEnumError(source: (HasName | HasString), badItem: string | number, e: EnumLike): Error;
//# sourceMappingURL=badEnumError.d.ts.map