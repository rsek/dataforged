
import t from 'ts-runtime/lib';
import IOracleCategoryDisplay from '../interfaces/IOracleCategoryDisplay';

export default class OracleCategoryDisplay implements IOracleCategoryDisplay {
  Title: string;
  constructor(json: Partial<IOracleCategoryDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
  }
}