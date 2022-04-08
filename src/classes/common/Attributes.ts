import type { IAttributeChoices } from "@dataforged/json_out/index.js";
import type { AttributeHash } from "@dataforged/utils/types/AttributeHash.js";
import _ from "lodash-es";

export class AttributeRequirements extends Array<IAttributeChoices> {
  constructor(json: AttributeHash) {
    const attributes = _.map(json, (value, key) => {
      let values;
      if (Array.isArray(value)) {
        values = value;
      } else if (value !== null) {
        values = [value];
      }
      return { Key: key, Values: values };
    });
    super(...attributes);
  }
}