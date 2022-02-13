

export interface IOracleContent {
  "Part of speech"?: string[];
  "Tags"?: string[];
}
export class OracleContent implements IOracleContent {
  "Part of speech"?: string[];
  "Tags"?: string[];
  constructor(json: IOracleContent) {
    this["Part of speech"] = json["Part of speech"] ?? undefined;
    this["Tags"] = json["Tags"] ?? undefined;
  }
}
