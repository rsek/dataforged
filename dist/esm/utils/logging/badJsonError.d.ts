import type { HasName } from "./HasName.js";
import type { HasString } from "./HasString.js";
/**
 * "Create an Error object with a message that includes the source and the object that failed to
 * conform to the interface."
 *
 * @param source - The source of the error.
 * @param obj - The object that caused the error.
 * @param message - The message to display.
 * @returns An Error object.
 */
export declare function badJsonError(source: (HasName | HasString), obj?: unknown, message?: string): Error;
//# sourceMappingURL=badJsonError.d.ts.map