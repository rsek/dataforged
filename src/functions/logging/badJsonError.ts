/**
 * "Create an Error object with a message that includes the source and the object that failed to
 * conform to the interface."
 *
 * The function is a little more complicated than it needs to be, but it's not too bad
 * @param {any} source - The source of the error.
 * @param {unknown} [obj] - The object that caused the error.
 * @param {string} [message=JSON does not conform to interface] - The message to display.
 * @returns An Error object.
 */
export default function badJsonError(source: (...params: unknown[]) => unknown | unknown, obj?: unknown, message: string = "JSON does not conform to interface"): Error {
  let srcId: string;
  if (source.name) {
    srcId = source.name;
  } else {
    srcId = source.toString();
  }
  let msg = `[${srcId}] ${message}`;
  if (obj) {
    msg += `: ${JSON.stringify(obj, null, 2)}`;
  }
  return new Error(msg);
}