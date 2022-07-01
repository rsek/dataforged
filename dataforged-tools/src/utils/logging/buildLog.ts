//License: MIT

/**
 * Logs a standardized build message to console.
 * @param fn - the function to tag the message with
 */
export function buildLog(fn: Function, message: string): void {
  const parentIdentifier = fn.name;
  const msg = `[${parentIdentifier}] ${message}`;
  // eslint-disable-next-line no-console
  console.info(msg);
}