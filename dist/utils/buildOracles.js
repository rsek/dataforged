import { OracleCategory } from "../classes/index.js";
import { REFS_PATH } from "../constants/index.js";
import { getSubdirs } from "./io/getSubdirs.js";
import { getYamlFiles } from "./io/getYamlFiles.js";
import { badJsonError } from "./logging/badJsonError.js";
import { buildLog } from "./logging/buildLog.js";
import { templateOracle } from "./object_transform/templateOracle.js";
import { loadOracleData } from "./process_yaml/loadOracleData.js";
/**
 * It takes the data from the oracles directory and builds a list of OracleCategory objects.
 * @returns An array of OracleCategory objects.
 */
export function buildOracles() {
    buildLog(buildOracles, "Building oracles...");
    const filesOracleCategories = getYamlFiles("oracles");
    // console.info(filesOracleCategories);
    const dirsOracleSubcategories = getSubdirs("oracles");
    const categoryRoot = loadOracleData(REFS_PATH, ...filesOracleCategories);
    const categories = categoryRoot.Categories;
    const filesOracleSubcategories = dirsOracleSubcategories.map(dir => getYamlFiles("", dir)).flat(1);
    const subcatRoot = loadOracleData(REFS_PATH, ...filesOracleSubcategories);
    const subcategories = subcatRoot.Categories.map((subcatData) => {
        if (subcatData._templateCategory) {
            // console.log("Building with template vars", subcatData);
            subcatData = templateOracle(subcatData, subcatData._templateCategory);
            delete subcatData._templateVars;
            delete subcatData._templateCategory;
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
                throw badJsonError(buildOracles, undefined, `"${subcat.Name}" assigns itself to this category, but the category doesn't list this subcategory by name.`);
            }
            if (!parentCat.Categories) {
                parentCat.Categories = [];
            }
            buildLog(buildOracles, `Assigning "${subcat.Name}" as subcategory of ${parentCat.Name}`);
            parentCat.Categories.push(subcat);
        }
    });
    const json = categories.map(categoryData => new OracleCategory(categoryData));
    const catCount = categories.length;
    const subcatCount = subcategories.length;
    // buildLog(buildOracles, `Finished building ${catCount} oracle categories (plus ${subcatCount} subcategories) containing ${tableCount} tables.`);
    return json;
}
//# sourceMappingURL=buildOracles.js.map