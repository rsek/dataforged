import { JSONPathOptions } from "jsonpath-plus";
/**
 * Recurses over an object and replaces a substring with another string.
 * @param object - The object to be searched and replaced. This function creates a copy and so does **not** mutate `obj`;
 * @param searchValue - The string to search for.
 * @param replaceValue - The value to replace.
 * @returns A copy of the original JSON object with all strings replaced.
 */
export declare function replaceInAllStrings<T extends JSONPathOptions['json']>(object: T, searchValue: string, replaceValue: string): T;
//# sourceMappingURL=replaceInAllStrings.d.ts.map