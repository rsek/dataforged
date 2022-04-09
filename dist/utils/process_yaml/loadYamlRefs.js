import { REFS_PATH } from "../../../dist/constants/refsPath.js";
import fs from "fs";
export function loadYamlRefs(path = REFS_PATH) {
    const files = fs.readdirSync(path).filter(item => item.match(".yaml"))
        .map(item => path.toString() + item);
    let refString = files.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
    refString = refString.replaceAll(/^/gim, "  ");
    refString = "_refs:\n" + refString;
    return refString;
}
//# sourceMappingURL=loadYamlRefs.js.map