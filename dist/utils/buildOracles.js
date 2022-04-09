import { OracleCategory } from "../../dist/classes/oracles/OracleCategory.js";
import { REFS_PATH } from "../../dist/constants/refsPath.js";
import { getSubdirs } from "../../dist/utils/io/getSubdirs.js";
import { getYamlFiles } from "../../dist/utils/io/getYamlFiles.js";
import { badJsonError } from "../../dist/utils/logging/badJsonError.js";
import { buildLog } from "../../dist/utils/logging/buildLog.js";
import { templateOracle } from "../../dist/utils/object_transform/templateOracle.js";
import { loadOracleData } from "../../dist/utils/process_yaml/loadOracleData.js";
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