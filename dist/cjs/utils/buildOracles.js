"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOracles = void 0;
const index_js_1 = require("../classes/index.js");
const index_js_2 = require("../constants/index.js");
const Gamespace_js_1 = require("../json_out/common/Gamespace.js");
const badJsonError_js_1 = require("./logging/badJsonError.js");
const buildLog_js_1 = require("./logging/buildLog.js");
const templateOracle_js_1 = require("./object_transform/templateOracle.js");
const concatWithYamlRefs_js_1 = require("./process_yaml/concatWithYamlRefs.js");
const loadOracleData_js_1 = require("./process_yaml/loadOracleData.js");
const sortIronsworn_js_1 = require("./sortIronsworn.js");
const fast_glob_1 = __importDefault(require("fast-glob"));
const jsonpath_1 = __importDefault(require("jsonpath"));
/**
 * It takes the data from the oracles directory and builds a list of OracleCategory objects.
 * @returns An array of OracleCategory objects.
 */
function buildOracles(gamespace = Gamespace_js_1.Gamespace.Starforged) {
    (0, buildLog_js_1.buildLog)(buildOracles, "Building oracles...");
    if (gamespace === "Ironsworn") {
        return buildIronswornOracles();
    }
    const oracleCatFiles = fast_glob_1.default.sync(`${index_js_2.MASTER_DATA_PATH}/${gamespace}/Oracles/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("category files", oracleCatFiles);
    const oracleSubcatFiles = fast_glob_1.default.sync(`${index_js_2.MASTER_DATA_PATH}/${gamespace}/Oracles/*/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("subcat files", oracleSubcatFiles);
    const categoryRoot = (0, loadOracleData_js_1.loadOracleData)(index_js_2.REFS_PATH, ...oracleCatFiles);
    const categories = categoryRoot.Categories;
    const subcatRoot = (0, loadOracleData_js_1.loadOracleData)(index_js_2.REFS_PATH, ...oracleSubcatFiles);
    const subcategories = subcatRoot.Categories.map((subcatData) => {
        if (subcatData._templateCategory) {
            // console.log("Building with template vars", subcatData);
            subcatData = (0, templateOracle_js_1.templateOracle)(subcatData, subcatData._templateCategory);
            // delete subcatData._templateVars;
            // delete subcatData._templateCategory;
            // console.log("resulting object:", subcatData);
        }
        return subcatData;
    });
    subcategories.forEach(subcat => {
        const parentName = subcat._childOf;
        if (!parentName) {
            throw (0, badJsonError_js_1.badJsonError)(buildOracles, undefined, `"${subcat.Name}" is not assigned to a subcategory.`);
        }
        const parentCat = categories.find(cat => cat.Name === parentName);
        if (parentCat._parentOf) {
            if (!parentCat._parentOf.includes(subcat.Name)) {
                throw (0, badJsonError_js_1.badJsonError)(buildOracles, subcat, `"${subcat.Name}" assigns itself to "${parentCat.Name}", but the category doesn't list this subcategory by name.`);
            }
            if (!parentCat.Categories) {
                parentCat.Categories = [];
            }
            (0, buildLog_js_1.buildLog)(buildOracles, `Assigning "${subcat.Name}" as subcategory of ${parentCat.Name}`);
            parentCat.Categories.push(subcat);
        }
    });
    const json = categories.map(categoryData => new index_js_1.OracleCategory(categoryData, gamespace));
    const catCount = categories.length;
    const subcatCount = subcategories.length;
    const tableCount = jsonpath_1.default.query(json, "$..[?(@.Table||@.Subtable)]").length;
    (0, buildLog_js_1.buildLog)(buildOracles, `Finished building ${catCount} oracle categories (plus ${subcatCount} subcategories) containing ${tableCount} tables.`);
    return json;
}
exports.buildOracles = buildOracles;
/**
 * Builds Ironsworn oracles from YAML (structurally much simpler)
 */
function buildIronswornOracles() {
    const catFiles = fast_glob_1.default.sync(`${index_js_2.MASTER_DATA_PATH}/Ironsworn/Oracles/*.(yml|yaml)`, { onlyFiles: true });
    // console.log("catFiles", catFiles);
    const categories = [];
    const catYaml = catFiles
        .map(moveFile => new index_js_1.OracleCategory((0, concatWithYamlRefs_js_1.concatWithYamlRefs)(index_js_2.REFS_PATH, moveFile), Gamespace_js_1.Gamespace.Ironsworn)).sort((a, b) => (0, sortIronsworn_js_1.sortIronsworn)(a.Source, b.Source));
    // merges categories that are spread across multiple files
    // e.g. Characters + Characters-Delve
    catYaml.forEach(oracleCat => {
        const targetIndex = categories.findIndex(item => item.Name === oracleCat.Name);
        if (targetIndex === -1) {
            categories.push(oracleCat);
        }
        else {
            (0, buildLog_js_1.buildLog)(buildOracles, `A category named "${oracleCat.Name}" exists, merging...`);
            categories[targetIndex].Oracles = categories[targetIndex].Oracles.concat(...oracleCat.Oracles).sort((a, b) => (0, sortIronsworn_js_1.sortIronsworn)(a.Source, b.Source));
        }
    });
    // console.log(categories);
    // const catCount = json.length;
    // const tableCount = jsonpath.query(json, "$..Table").length;
    // buildLog(buildOracles, `Finished building ${catCount} oracle categories`);
    return categories;
}
//# sourceMappingURL=buildOracles.js.map