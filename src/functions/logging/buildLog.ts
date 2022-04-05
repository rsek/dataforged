/* eslint-disable @typescript-eslint/ban-types */
interface IMayHaveId extends Function {
  $id?: string;
}


/**
 * Logs a standardized build message to console.
 * @date 4/5/2022 - 2:01:48 AM
 *
 * @export
 * @param {Function} fn
 * @param {string} message
 */
export default function buildLog(fn: Function, message: string): void {
  const parentIdentifier = fn.name;
  const msg = `[${parentIdentifier}] ${message}`;
  // eslint-disable-next-line no-console
  console.info(msg);
}