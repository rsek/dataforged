
import t from 'ts-runtime/lib';
import { is } from 'typescript-is';
import IOracleContent from '../interfaces/IOracleContent';

export default class OracleContent implements IOracleContent {
  "Part of speech"?: string[] | undefined;
  "Tags"?: string[] | undefined;
  constructor(json: IOracleContent) {
    if (!is<IOracleContent>(json)) {
      throw new Error(`Json does not conform to type: ${JSON.stringify(json)}`)
    }
    this["Part of speech"] = json["Part of speech"] ?? undefined;
    this["Tags"] = json["Tags"] ?? undefined;
  }
}
