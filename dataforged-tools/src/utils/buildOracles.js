import { OracleCategory } from "@classes/index.js";
import { MASTER_DATA_PATH, REFS_PATH } from "@constants/index.js";
import { Gamespace } from "@json_out/common/Gamespace.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { templateOracle } from "@utils/object_transform/templateOracle.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import { loadOracleData } from "@utils/process_yaml/loadOracleData.js";
import { sortIronsworn } from "@utils/sortIronsworn.js";
import FastGlob from "fast-glob";
import jsonpath from "jsonpath";
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
            throw badJsonError(buildOracles, undefined, `"${subcat.Name}" is not assigned to a subcategory.`);
        }
        const parentCat = categories.find(cat => cat.Name === parentName);
        if (parentCat._parentOf) {
            if (!parentCat._parentOf.includes(subcat.Name)) {
                throw badJsonError(buildOracles, subcat, `"${subcat.Name}" assigns itself to "${parentCat.Name}", but the category doesn't list this subcategory by name.`);
            }
            if (!parentCat.Categories) {
                parentCat.Categories = [];
            }
            buildLog(buildOracles, `Assigning "${subcat.Name}" as subcategory of ${parentCat.Name}`);
            parentCat.Categories.push(subcat);
        }
    });
    const json = categories.map(categoryData => new OracleCategory(categoryData, gamespace));
    const catCount = categories.length;
    const subcatCount = subcategories.length;
    const tableCount = jsonpath.query(json, "$..[?(@.Table||@.Subtable)]").length;
    buildLog(buildOracles, `Finished building ${catCount} oracle categories (plus ${subcatCount} subcategories) containing ${tableCount} tables.`);
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
        const targetIndex = categories.findIndex(item => item.Name === oracleCat.Name);
        if (targetIndex === -1) {
            categories.push(oracleCat);
        }
        else {
            buildLog(buildOracles, `A category named "${oracleCat.Name}" exists, merging...`);
            categories[targetIndex].Oracles = categories[targetIndex].Oracles.concat(...oracleCat.Oracles).sort((a, b) => sortIronsworn(a.Source, b.Source));
        }
    });
    // console.log(categories);
    // const catCount = json.length;
    // const tableCount = jsonpath.query(json, "$..Table").length;
    // buildLog(buildOracles, `Finished building ${catCount} oracle categories`);
    return categories;
}
