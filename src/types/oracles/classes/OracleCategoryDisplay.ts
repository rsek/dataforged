

import type UrlString from "../../general/UrlString.js";
import type IOracleCategoryDisplay from "../interfaces/IOracleCategoryDisplay.js";

export default class OracleCategoryDisplay implements IOracleCategoryDisplay {
  Title: string;
  Images?: UrlString[] | undefined;
  constructor(json: Partial<IOracleCategoryDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
  }
}