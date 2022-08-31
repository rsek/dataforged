import { OracleCategory } from "../classes/index.js";
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
 * It takes the data from the oracles directory and builds a list of OracleCategory objects.
 * @returns An array of OracleCategory objects.
 */
export function buildOracles(gamespace = Gamespace.Starforged) {
    buildLog(buildOracles, "Building oracles...");
    if (gamespace === "Ironsworn") {
        return buildIronswornOracles();
    }
    const oracleCatFiles = FastGlob.sync(`${MASTER_DATA_PATH}/${gamespace}/Oracles/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("category files", oracleCatFiles);
    const oracleSubcatFiles = FastGlob.sync(`${MASTER_DATA_PATH}/${gamespace}/Oracles/*/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("subcat files", oracleSubcatFiles);
    const categoryRoot = loadOracleData(REFS_PATH, ...oracleCatFiles);
    const categories = categoryRoot.Categories;
    const subcatRoot = loadOracleData(REFS_PATH, ...oracleSubcatFiles);
    const subcategories = subcatRoot.Categories.map((subcatData) => {
        if (subcatData._templateCategory) {
            // console.log("Building with template vars", subcatData);
            subcatData = templateOracle(subcatData, subcatData._templateCategory);
            // delete subcatData._templateVars;
            // delete subcatData._templateCategory;
            // console.log("resulting object:", subcatData);
        }
        return subcatData;
    });
    subcategories.forEach(subcat => {
        const parentName = subcat._childOf;
        if (!parentName) {
            throw badJsonError(buildOracles, undefined, `"${subcat.Title.Canonical}" is not assigned to a subcategory.`);
        }
        const parentCat = categories.find(cat => cat.Title.Canonical === parentName && cat._parentOf.includes(subcat.Title.Canonical));
        if (parentCat._parentOf) {
            if (!parentCat._parentOf.includes(subcat.Title.Canonical)) {
                throw badJsonError(buildOracles, subcat, `"${subcat.Title.Canonical}" assigns itself to "${parentCat.Title.Canonical}", but the category doesn't list this subcategory by name.`);
            }
            if (!parentCat.Categories) {
                parentCat.Categories = [];
            }
            buildLog(buildOracles, `Assigning "${subcat.Title.Canonical}" as subcategory of ${parentCat.Title.Canonical}`);
            parentCat.Categories.push(subcat);
        }
    });
    const json = categories.map(categoryData => new OracleCategory(categoryData, gamespace));
    buildLog(buildOracles, `Finished building ${oracleStats(json)}`);
    return json;
}
/**
 * Builds Ironsworn oracles from YAML (structurally much simpler)
 */
function buildIronswornOracles() {
    const catFiles = FastGlob.sync(`${MASTER_DATA_PATH}/Ironsworn/Oracles/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("catFiles", catFiles);
    const categories = [];
    const catYaml = catFiles
        .map(moveFile => new OracleCategory(concatWithYamlRefs(REFS_PATH, moveFile), Gamespace.Ironsworn)).sort((a, b) => sortIronsworn(a.Source, b.Source));
    // merges categories that are spread across multiple files
    // e.g. Characters + Characters-Delve
    catYaml.forEach(oracleCat => {
        const targetIndex = categories.findIndex(item => item.Title.Canonical === oracleCat.Title.Canonical);
        if (targetIndex === -1) {
            categories.push(oracleCat);
        }
        else {
            buildLog(buildOracles, `A category named "${oracleCat.Title.Canonical}" exists, merging...`);
            categories[targetIndex].Oracles = categories[targetIndex].Oracles.concat(...oracleCat.Oracles).sort((a, b) => sortIronsworn(a.Source, b.Source));
        }
    });
    // console.log(categories);
    // const catCount = json.length;
    // const tableCount = jsonpath.query(json, "$..Table").length;
    // buildLog(buildOracles, `Finished building ${catCount} oracle categories`);
    return categories;
}
//# sourceMappingURL=buildOracles.js.map