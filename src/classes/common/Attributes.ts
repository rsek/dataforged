import type IAttributeChoices from "@dataforged/interfaces/json_out/common/IAttributeChoices.js";
import _ from "lodash-es";
import type AttributeHash from "@dataforged/utils/types/AttributeHash.js";

export default class AttributeRequirements extends Array<IAttributeChoices> {
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