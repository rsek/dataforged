/* eslint-disable @typescript-eslint/naming-convention */
import type { AttributeChoices, AttributeKey, AttributeValue } from "@schema_json";
import type { AttributeHash } from "@utils/types/AttributeHash.js";
import _ from "lodash-es";


/**
 * @internal
 */
export class AttributeRequirementsBuilder extends Array<AttributeChoices> {
  constructor(json: AttributeHash) {
    super();
    _.forEach<AttributeHash<AttributeKey>>(json, (value, key) => {
      let values;
      if (Array.isArray(value)) {
        values = value;
      } else if (value !== null) {
        values = [value];
      }
      const Key = key as AttributeKey;
      const Values = values as AttributeValue<typeof Key>[];
      this.push( { Key, Values });
    });
  }
}