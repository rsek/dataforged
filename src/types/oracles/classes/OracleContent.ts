
import t from 'ts-runtime/lib';
import IOracleContent from '../interfaces/IOracleContent';

export default class OracleContent implements IOracleContent {
  "Part of speech"?: string[];
  "Tags"?: string[];
  constructor(json: IOracleContent) {
    this["Part of speech"] = json["Part of speech"] ?? undefined;
    this["Tags"] = json["Tags"] ?? undefined;
  }
}
