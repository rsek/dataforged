

import OracleCategoryInfo from "../types/oracles/classes/OracleCategory";
import getSubdirs from "./io/getSubdirs";
import getYamlFiles from "./io/getYamlFiles";
import fs, { writeFileSync } from "fs";
import { refsPath } from "./process-yaml/concatWithYamlRefs";
import loadOracleData, { IOracleCatRoot } from "./process-yaml/loadOracleData";
import jsonpath from "jsonpath";
import { is } from 'typescript-is';
import { OracleCategoryName } from '../types/oracles/OracleCategoryId';
import { OracleSubcategoryName } from '../types/oracles/OracleSubcategoryId';
import buildLog from './logging/buildLog';
import templateOracle from './object-transform/templateOracle';
import replaceInAllStrings from "./object-transform/replaceInAllStrings"
import writeJson from './io/writeJSON';
import _ from 'lodash';
import badJsonError from './logging/badJsonError';
import IOracleCategoryYaml from '../types/oracles/interfaces/yaml/IOracleCategoryYaml';

interface IOracleSubcategoryData extends IOracleCategoryYaml {
  Name: OracleSubcategoryName;
  _childOf: OracleCategoryName;
}
interface IOracleParentCategoryData extends IOracleCategoryYaml {
  Name: OracleCategoryName;
  _parentOf: OracleSubcategoryName[];
}

interface IOracleParentCatRoot extends IOracleCatRoot {
  Categories: IOracleParentCategoryData[];
}

interface IOracleSubcatRoot extends IOracleCatRoot {
  Categories: IOracleSubcategoryData[];
}

export default function buildOracles(): OracleCategoryInfo[] {
  buildLog(buildOracles, "Building oracles...");
  const filesOracleCategories: fs.PathLike[] = getYamlFiles("oracles");
  // console.info(filesOracleCategories);

  const dirsOracleSubcategories: fs.PathLike[] = getSubdirs("oracles");
  const categoryRoot: IOracleParentCatRoot = loadOracleData(refsPath, ...filesOracleCategories) as IOracleParentCatRoot;

  const categories = categoryRoot.Categories;

  const filesOracleSubcategories: fs.PathLike[] = dirsOracleSubcategories.map(dir => getYamlFiles("", dir)).flat(1);

  const subcatRoot: IOracleSubcatRoot = loadOracleData(refsPath, ...filesOracleSubcategories) as IOracleSubcatRoot;

  let subcategories = subcatRoot.Categories.map((subcatData) => {
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
    const parentCat = categories.find(cat => cat.Name == parentName) as IOracleCategoryYaml;

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
  const json: OracleCategoryInfo[] = categories.map(categoryData => new OracleCategoryInfo(categoryData));

  const catCount = categories.length;
  const subcatCount = subcategories.length;

  // buildLog(buildOracles, `Finished building ${catCount} oracle categories (plus ${subcatCount} subcategories) containing ${tableCount} tables.`);
  return json;
}


