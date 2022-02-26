
import t from 'ts-runtime/lib';
import { is } from 'typescript-is';
import badJsonError from '../../../functions/logging/badJsonError';
import IOracleContent from '../interfaces/IOracleContent';

export default class OracleContent implements IOracleContent {
  "Part of speech"?: string[] | undefined;
  "Tags"?: string[] | undefined;
  constructor(json: IOracleContent) {
    if (!is<IOracleContent>(json)) {
      throw badJsonError(this.constructor, json, "Expected IOracleContent")
    }
    this["Part of speech"] = json["Part of speech"] ?? undefined;
    this["Tags"] = json["Tags"] ?? undefined;
  }
}
