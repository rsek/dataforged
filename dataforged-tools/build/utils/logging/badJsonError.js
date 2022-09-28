/**
 * "Create an Error object with a message that includes the source and the object that failed to
 * conform to the interface."
 *
 * @param source - The source of the error.
 * @param obj - The object that caused the error.
 * @param message - The message to display.
 * @returns An Error object.
 */
export function badJsonError (source, obj, message = 'JSON does not conform to schema') {
  let srcId
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (source.name) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    srcId = source.name
  } else {
    srcId = source.toString()
  }
  let msg = `[${srcId}] ${message}`
  if (obj) {
    msg += `: ${JSON.stringify(obj, null, 2)}`
  }
  return new Error(msg)
}
// # sourceMappingURL=badJsonError.js.map
