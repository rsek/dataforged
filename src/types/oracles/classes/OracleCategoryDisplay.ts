

import UrlString from "../../general/UrlString";
import IOracleCategoryDisplay from "../interfaces/IOracleCategoryDisplay";

export default class OracleCategoryDisplay implements IOracleCategoryDisplay {
  Title: string;
  Images?: UrlString[] | undefined;
  constructor(json: Partial<IOracleCategoryDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
  }
}