import { OracleSet } from "../classes/index.js";
import { MASTER_DATA_PATH, REFS_PATH } from "../constants/index.js";
import { Gamespace } from "../json_out/index.js";
import { oracleStats } from "./dataforgedStats.js";
import { badJsonError } from "./logging/badJsonError.js";
import { buildLog } from "./logging/buildLog.js";
import { templateOracle } from "./object_transform/templateOracle.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import { loadOracleData } from "./process_yaml/loadOracleData.js";
import { sortIronsworn } from "./sortIronsworn.js";
import FastGlob from "fast-glob";
/**
 * It takes the data from the oracles directory and builds a list of {@link OracleSet} objects.
 * @returns An array of {@link OracleSet} objects.
 */
export function buildOracles(gamespace = Gamespace.Starforged) {
    const rootId = `${gamespace}/Oracles`;
    buildLog(buildOracles, "Building oracles...");
    if (gamespace === "Ironsworn") {
        return buildIronswornOracles();
    }
    const oracleSetFiles = FastGlob.sync(`${MASTER_DATA_PATH}/${gamespace}/Oracles/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("set files", oracleSetFiles);
    const oracleSubsetFiles = FastGlob.sync(`${MASTER_DATA_PATH}/${gamespace}/Oracles/*/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("subset files", oracleSubsetFiles);
    const oracleSetRoot = loadOracleData(REFS_PATH, ...oracleSetFiles);
    const sets = oracleSetRoot.Sets;
    const subsetRoot = loadOracleData(REFS_PATH, ...oracleSubsetFiles);
    const subsets = subsetRoot.Sets.map((subsetData) => {
        if (subsetData._templateOracleSet) {
            // console.log("Building with template vars", subsetData);
            subsetData = templateOracle(subsetData, subsetData._templateOracleSet);
            // delete subsetData._templateVars;
            // delete subsetData._templateOracleSet;
            // console.log("resulting object:", subsetData);
        }
        return subsetData;
    });
    subsets.forEach(subset => {
        const parentName = subset._childOf;
        if (!parentName) {
            throw badJsonError(buildOracles, undefined, `"${subset.Title.Canonical}" is not assigned to a subset.`);
        }
        const parentSet = sets.find(cat => cat.Title.Canonical === parentName && cat._parentOf.includes(subset.Title.Canonical));
        if (parentSet._parentOf) {
            if (!parentSet._parentOf.includes(subset.Title.Canonical)) {
                throw badJsonError(buildOracles, subset, `"${subset.Title.Canonical}" assigns itself to "${parentSet.Title.Canonical}", but the set doesn't list this subset by name.`);
            }
            if (!parentSet.Sets) {
                parentSet.Sets = [];
            }
            buildLog(buildOracles, `Assigning "${subset.Title.Canonical}" as subset of ${parentSet.Title.Canonical}`);
            parentSet.Sets.push(subset);
        }
    });
    const json = sets.map(setData => new OracleSet(setData, rootId));
    buildLog(buildOracles, `Finished building ${oracleStats(json)}`);
    return json;
}
/**
 * Builds Ironsworn oracles from YAML (structurally much simpler)
 */
function buildIronswornOracles() {
    const rootId = `${Gamespace.Ironsworn}/Oracles`;
    const setFiles = FastGlob.sync(`${MASTER_DATA_PATH}/Ironsworn/Oracles/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("setFiles", setFiles);
    const oracleSets = [];
    const setYaml = setFiles
        .map(moveFile => new OracleSet(concatWithYamlRefs(REFS_PATH, moveFile), rootId)).sort((a, b) => sortIronsworn(a.Source, b.Source));
    // merges sets that are spread across multiple files
    // e.g. Characters + Characters-Delve
    setYaml.forEach(oracleSet => {
        const targetIndex = oracleSets.findIndex(item => item.Title.Canonical === oracleSet.Title.Canonical);
        if (targetIndex === -1) {
            oracleSets.push(oracleSet);
        }
        else {
            buildLog(buildOracles, `A set named "${oracleSet.Title.Canonical}" exists, merging...`);
            oracleSets[targetIndex].Tables = oracleSets[targetIndex].Tables.concat(...oracleSet.Tables).sort((a, b) => sortIronsworn(a.Source, b.Source));
        }
    });
    // console.log(sets);
    // const setCount = json.length;
    // const tableCount = jsonpath.query(json, "$..Table").length;
    // buildLog(buildOracles, `Finished building ${setCount} oracle sets`);
    return oracleSets;
}
//# sourceMappingURL=buildOracles.js.map