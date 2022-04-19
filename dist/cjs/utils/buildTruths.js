"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTruths = void 0;
const index_js_1 = require("../classes/index.js");
const index_js_2 = require("../constants/index.js");
const Gamespace_js_1 = require("../json_out/common/Gamespace.js");
const buildLog_js_1 = require("./logging/buildLog.js");
const concatWithYamlRefs_js_1 = require("./process_yaml/concatWithYamlRefs.js");
const fs_1 = require("fs");
/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
function buildTruths(gamespace) {
    (0, buildLog_js_1.buildLog)(buildTruths, "Building setting truths...");
    const filePath = `${index_js_2.MASTER_DATA_PATH}/${gamespace}/Truths.yaml`;
    if (!(0, fs_1.existsSync)(filePath)) {
        (0, buildLog_js_1.buildLog)(buildTruths, "No setting truth file found. Returned an empty array.");
        return [];
    }
    switch (gamespace) {
        case Gamespace_js_1.Gamespace.Ironsworn:
            (0, buildLog_js_1.buildLog)(buildTruths, "Ironsworn truths NYI.");
            return [];
        case Gamespace_js_1.Gamespace.Starforged: {
            const truthsRoot = (0, concatWithYamlRefs_js_1.concatWithYamlRefs)(undefined, filePath);
            const truths = truthsRoot.Truths.map(item => new index_js_1.SettingTruth(item, truthsRoot.Source, gamespace));
            (0, buildLog_js_1.buildLog)(buildTruths, `Finished building ${truths.length} setting truth categories.`);
            return truths;
        }
        default:
            throw new Error();
    }
}
exports.buildTruths = buildTruths;
//# sourceMappingURL=buildTruths.js.map