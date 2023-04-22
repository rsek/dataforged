import { REFS_PATH } from "../../constants/index.js";
import * as fs from "fs";
/**
 * It loads all the yaml files in the templates directory and joins them into a single string.
 * @param path - The path to the directory containing the YAML files.
 * @returns A string of YAML that can be parsed by the `yaml` module.
 */
export function loadYamlTemplates(path = REFS_PATH.toString() + "/templates/") {
    const files = fs.readdirSync(path).filter(item => item.match(".yaml"))
        .map(item => path.toString() + item);
    let templateString = files.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
    templateString = templateString.replaceAll(/^/gim, "  ");
    templateString = "_templates:\n" + templateString;
    return templateString;
}
//# sourceMappingURL=loadYamlTemplates.js.map