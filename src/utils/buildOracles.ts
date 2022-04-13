import { OracleCategory } from "@classes/index.js";
import { MASTER_DATA_PATH, REFS_PATH } from "@constants/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { OracleCategoryName , OracleSubcategoryName } from "@json_out/index.js";
import { getSubdirs } from "@utils/io/getSubdirs.js";
import { getYamlFiles } from "@utils/io/getYamlFiles.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { templateOracle } from "@utils/object_transform/templateOracle.js";
import type { IOracleCatRoot } from "@utils/process_yaml/loadOracleData.js";
import { loadOracleData } from "@utils/process_yaml/loadOracleData.js";
import type { IOracleCategoryYaml } from "@yaml_in/index.js";
import type { IOracleParentCatRoot } from "@yaml_in/oracles/IOracleParentCatRootYaml.js";
import FastGlob from "fast-glob";

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
export function buildOracles(gamespace: Gamespace = "Starforged"): OracleCategory[] {
  buildLog(buildOracles, "Building oracles...");
  // const oracleCatFiles: PathLike[] = getYamlFiles("Oracles");
  const oracleCatFiles = FastGlob.sync(`${MASTER_DATA_PATH as string}/${gamespace}/Oracles/*.(yml|yaml)`, { onlyFiles: true });

  const oracleSubcatFiles = FastGlob.sync(`${MASTER_DATA_PATH as string}/${gamespace}/Oracles/*/*.(yml|yaml)`, { onlyFiles: true });

  const categoryRoot: IOracleParentCatRoot = loadOracleData(REFS_PATH, ...oracleCatFiles) as IOracleParentCatRoot;

  const categories = categoryRoot.Categories;

  const subcatRoot: IOracleSubcatRoot = loadOracleData(REFS_PATH, ...oracleSubcatFiles) as IOracleSubcatRoot;

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
  const json: OracleCategory[] = categories.map(categoryData => new OracleCategory(categoryData, gamespace));

  const catCount = categories.length;
  const subcatCount = subcategories.length;

  // buildLog(buildOracles, `Finished building ${catCount} oracle categories (plus ${subcatCount} subcategories) containing ${tableCount} tables.`);
  return json;
}

