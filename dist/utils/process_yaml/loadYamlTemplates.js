import { REFS_PATH } from "../../constants/index.js";
import fs from "fs";
export function loadYamlTemplates(path = REFS_PATH.toString() + "/templates/") {
    const files = fs.readdirSync(path).filter(item => item.match(".yaml"))
        .map(item => path.toString() + item);
    let templateString = files.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
    templateString = templateString.replaceAll(/^/gim, "  ");
    templateString = "_templates:\n" + templateString;
    return templateString;
}
//# sourceMappingURL=loadYamlTemplates.js.map