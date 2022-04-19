import { REFS_PATH } from "../../constants/index.js";
import FastGlob from "fast-glob";
import fs from "fs";
/**
 * It loads all the yaml files in the refs folder and joins them into a single string.
 * @param path - The path to the directory containing the YAML files.
 * @returns A string of YAML that is the concatenation of the contents of the files in the `index`
 * directory.
 */
export function loadYamlRefs(path = REFS_PATH) {
    const files = FastGlob.sync(path + "/*.(yml|yaml)", { onlyFiles: true });
    let refString = files.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
    refString = refString.replaceAll(/^/gim, "  ");
    refString = "_refs:\n" + refString;
    return refString;
}
//# sourceMappingURL=loadYamlRefs.js.map