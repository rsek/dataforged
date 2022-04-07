import type HasName from "@dataforged/utils/logging/HasName.js";
import type HasString from "@dataforged/utils/logging/HasString.js";

/**
 * "Create an Error object with a message that includes the source and the object that failed to
 * conform to the interface."
 *
 * @param source - The source of the error.
 * @param obj - The object that caused the error.
 * @param message - The message to display.
 * @returns An Error object.
 */
export default function badJsonError(source: (HasName | HasString), obj?: unknown, message: string = "JSON does not conform to interface"): Error {
  let srcId: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (source.name) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    srcId = source.name as string;
  } else {
    srcId = source.toString();
  }
  let msg = `[${srcId}] ${message}`;
  if (obj) {
    msg += `: ${JSON.stringify(obj, null, 2)}`;
  }
  return new Error(msg);
}