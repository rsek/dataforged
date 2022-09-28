
/**
 * It checks if the string is a valid hex color.
 * @param str - The string to be validated.
 * @returns A boolean value.
 */
export function validateColor (str: string) {
  return RegExp(/#?[0-9A-Fa-f]{6}/g).test(str)
}
