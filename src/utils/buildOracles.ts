import { OracleCategory } from "@dataforged/classes/oracles/OracleCategory.js";
import { REFS_PATH } from "@dataforged/constants/refsPath.js";
import type { OracleCategoryName , OracleSubcategoryName } from "@dataforged/json_out/index.js";
import { getSubdirs } from "@dataforged/utils/io/getSubdirs.js";
import { getYamlFiles } from "@dataforged/utils/io/getYamlFiles.js";
import type { IOracleParentCatRoot } from "@dataforged/utils/IOracleParentCatRoot.js";
import { badJsonError } from "@dataforged/utils/logging/badJsonError.js";
import { buildLog } from "@dataforged/utils/logging/buildLog.js";
import { templateOracle } from "@dataforged/utils/object_transform/templateOracle.js";
import type { IOracleCatRoot } from "@dataforged/utils/process_yaml/loadOracleData.js";
import { loadOracleData } from "@dataforged/utils/process_yaml/loadOracleData.js";
import type { IOracleCategoryYaml } from "@dataforged/yaml_in/index.js";
import type fs from "fs";

interface IOracleSubcategoryData extends IOracleCategoryYaml {
  Name: OracleSubcategoryName;
  _childOf: OracleCategoryName;
}
export interface IOracleParentCategoryData extends IOracleCategoryYaml {
  Name: OracleCategoryName;
  _parentOf: OracleSubcategoryName[];
}

interface IOracleSubcatRoot extends IOracleCatRoot {
  Categories: IOracleSubcategoryData[];
}

/**
 * It takes the data from the oracles directory and builds a list of OracleCategory objects.
 * @returns An array of OracleCategory objects.
 */
export function buildOracles(): OracleCategory[] {
  buildLog(buildOracles, "Building oracles...");
  const filesOracleCategories: fs.PathLike[] = getYamlFiles("oracles");
  // console.info(filesOracleCategories);

  const dirsOracleSubcategories: fs.PathLike[] = getSubdirs("oracles");
  const categoryRoot: IOracleParentCatRoot = loadOracleData(REFS_PATH, ...filesOracleCategories) as IOracleParentCatRoot;

  const categories = categoryRoot.Categories;

  const filesOracleSubcategories: fs.PathLike[] = dirsOracleSubcategories.map(dir => getYamlFiles("", dir)).flat(1);

  const subcatRoot: IOracleSubcatRoot = loadOracleData(REFS_PATH, ...filesOracleSubcategories) as IOracleSubcatRoot;

  const subcategories = subcatRoot.Categories.map((subcatData) => {
    if (subcatData._templateCategory) {
      // console.log("Building with template vars", subcatData);
      subcatData = templateOracle<IOracleSubcategoryData>(subcatData, subcatData._templateCategory);
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
    const parentCat = categories.find(cat => cat.Name === parentName) as IOracleCategoryYaml;

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
  const json: OracleCategory[] = categories.map(categoryData => new OracleCategory(categoryData));

  const catCount = categories.length;
  const subcatCount = subcategories.length;

  // buildLog(buildOracles, `Finished building ${catCount} oracle categories (plus ${subcatCount} subcategories) containing ${tableCount} tables.`);
  return json;
}

