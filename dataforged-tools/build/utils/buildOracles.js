import { OracleSetBuilder } from "../builders";
import { MASTER_DATA_PATH, REFS_PATH } from "../constants";
import { Gamespace } from "../schema_json";
import { oracleStats } from "./dataforgedStats.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import fs from "fs-extra";
import fg from "fast-glob";
import _ from "lodash";
import { validate } from "jsonschema";
import { badJsonError } from "./logging/badJsonError.js";
const SCHEMA_YAML = fs.readJsonSync("../_master-data/schema/oracles.json");
/**
 * It takes the data from the oracles directory and builds a list of {@link OracleSetBuilder} objects.
 * @returns An array of {@link OracleSetBuilder} objects.
 */
export function buildOracles(gamespace = Gamespace.Starforged) {
    buildLog(buildOracles, "Building oracles...");
    let oracleSetFiles = fg.sync(`${MASTER_DATA_PATH}/${gamespace}/Oracles/**/*.(yml|yaml)`, { onlyFiles: true });
    const oracleSetData = _.omitBy(concatWithYamlRefs(REFS_PATH, ...oracleSetFiles), (v, k) => k.startsWith("_"));
    const validation = validate(oracleSetData, SCHEMA_YAML);
    if (!validation.valid) {
        throw badJsonError(buildOracles, validation.errors.map(err => _.omit(err, "instance", "schema")));
    }
    const oracleJson = _(oracleSetData).mapValues((oracleSet) => new OracleSetBuilder(oracleSet, `${gamespace}/Oracles`)).value();
    buildLog(buildOracles, `Finished building ${oracleStats(oracleJson)}`);
    return oracleJson;
}
//# sourceMappingURL=buildOracles.js.map