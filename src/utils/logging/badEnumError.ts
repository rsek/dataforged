import type { HasName } from "@dataforged/utils/logging/HasName.js";
import type { HasString } from "@dataforged/utils/logging/HasString.js";
import type { EnumLike } from "@dataforged/utils/types/EnumLike.js";

/**
 * It creates an error message for when a value is not present in an enum.
 * @param source - The source of the error. This can be anything with a "toString" method, or an object with a `name` property.
 * @param badItem - the bad item that was passed in
 * @param e - EnumLike
 * @returns An Error.
 */
export function badEnumError(source: (HasName | HasString), badItem: string|number, e: EnumLike): Error {
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

