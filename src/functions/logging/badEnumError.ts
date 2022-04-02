import type HasName from "./HasName.js";
import type HasString from "./HasString.js";
import type EnumLike from "../../types/general/EnumLike.js";

/**
 * It creates an error message for when a value is not present in an enum.
 * @param source - The source of the error. This can be anything with a "toString" method, or an object with a `name` property.
 * @param {string|number} badItem - the bad item that was passed in
 * @param {EnumLike} e - EnumLike
 * @returns An Error.
 */
export default function badEnumError(source: (HasName | HasString), badItem: string|number, e: EnumLike): Error {
  let srcId: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof source.name !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    srcId = source.name as string;
  } else {
    srcId = source.toString();
  }
  const msg = `[${srcId}] "${badItem}" not present in ${JSON.stringify(e)}`;
  return new Error(msg);
}

