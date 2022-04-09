import { OracleCategory } from "../classes/index.js";
import { REFS_PATH } from "../constants/index.js";
import { getSubdirs } from "./io/getSubdirs.js";
import { getYamlFiles } from "./io/getYamlFiles.js";
import { badJsonError } from "./logging/badJsonError.js";
import { buildLog } from "./logging/buildLog.js";
import { templateOracle } from "./object_transform/templateOracle.js";
import { loadOracleData } from "./process_yaml/loadOracleData.js";
export function buildOracles() {
    buildLog(buildOracles, "Building oracles...");
    const filesOracleCategories = getYamlFiles("oracles");
    const dirsOracleSubcategories = getSubdirs("oracles");
    const categoryRoot = loadOracleData(REFS_PATH, ...filesOracleCategories);
    const categories = categoryRoot.Categories;
    const filesOracleSubcategories = dirsOracleSubcategories.map(dir => getYamlFiles("", dir)).flat(1);
    const subcatRoot = loadOracleData(REFS_PATH, ...filesOracleSubcategories);
    const subcategories = subcatRoot.Categories.map((subcatData) => {
        if (subcatData._templateCategory) {
            subcatData = templateOracle(subcatData, subcatData._templateCategory);
            delete subcatData._templateVars;
            delete subcatData._templateCategory;
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
    return json;
}
//# sourceMappingURL=buildOracles.js.map