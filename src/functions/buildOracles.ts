import t from 'ts-runtime/lib';

import OracleCategoryInfo from "../types/oracles/classes/OracleCategoryInfo";
import getSubdirs from "./getSubdirs";
import getYamlFiles from "./getYamlFiles";
import fs, { writeFileSync } from "fs";
import { refsPath } from "./buildWithRefs";
import buildOraclesWithRefs, { IOracleCatRoot } from "./buildOraclesWithRefs";
import jsonpath from "jsonpath";
import { is } from 'typescript-is';
import IOracleCategoryData from '../types/oracles/interfaces/IOracleCategoryData';
import { OracleCategoryName } from '../types/oracles/OracleCategoryId';
import { OracleSubcategoryName } from '../types/oracles/OracleSubcategoryId';
import buildLog from './buildLog';
import buildFromTemplate from './buildFromTemplate';
import replaceInAllStrings from "./replaceInAllStrings"
import writeJson from './writeJSON';
import _ from 'lodash';

interface IOracleSubcategoryData extends IOracleCategoryData {
  Name: OracleSubcategoryName;
  _childOf: OracleCategoryName;
}
interface IOracleParentCategoryData extends IOracleCategoryData {
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
  const categoryRoot: IOracleParentCatRoot = buildOraclesWithRefs(refsPath, ...filesOracleCategories) as IOracleParentCatRoot;

  const categories = categoryRoot.Categories;

  const filesOracleSubcategories: fs.PathLike[] = dirsOracleSubcategories.map(dir => getYamlFiles("", dir)).flat(1);

  const subcatRoot: IOracleSubcatRoot = buildOraclesWithRefs(refsPath, ...filesOracleSubcategories) as IOracleSubcatRoot;

  let subcategories = subcatRoot.Categories.map((subcatData) => {
    if (subcatData._templateCategory) {
      // console.log("Building with template vars", subcatData);
      subcatData = buildFromTemplate<IOracleSubcategoryData>(subcatData, subcatData._templateCategory);
      delete subcatData._templateVars;
      delete subcatData._templateCategory;
      // console.log("resulting object:", subcatData);
    }
    return subcatData;
  });

  subcategories.forEach(subcat => {
    const parentName = subcat._childOf;
    if (!parentName) {
      throw new Error(`[buildOracles] "${subcat.Name}" is not assigned to a subcategory.`);
    }
    const parentCat = categories.find(cat => cat.Name == parentName) as IOracleCategoryData;

    if (parentCat._parentOf) {
      if (!parentCat._parentOf.includes(subcat.Name)) {
        throw new Error(`[buildOracles] "${subcat.Name}" assigns itself to this category, but the category doesn't list this subcategory by name.`);
      }
      if (!parentCat.Categories) {
        parentCat.Categories = [];
      }
      console.info(`[buildOracles] Assigning "${subcat.Name}" as subcategory of ${parentCat.Name}`);
      parentCat.Categories.push(subcat);
    }
  });
  const json: OracleCategoryInfo[] = categories.map(categoryData => new OracleCategoryInfo(categoryData));

  const catCount = categories.length;
  const subcatCount = subcategories.length;
  const tables = jsonpath.query(json, "$..[?(@.Table||@.Subtable)]");
  const tableCount = tables.length;
  console.info(`[buildOracles] Finished building ${catCount} oracle categories (plus ${subcatCount} subcategories) containing ${tableCount} tables.`);
  return json;
}


