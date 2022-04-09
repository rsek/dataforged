import yaml from "js-yaml";
import fs from "fs";
export function writeYaml(filePathOut, jsonObj) {
    const yamlData = yaml.dump(jsonObj, {
        lineWidth: -1,
        quotingType: "\"",
    });
    fs.writeFileSync(filePathOut, yamlData);
}
//# sourceMappingURL=writeYaml.js.map