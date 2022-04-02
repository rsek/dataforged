import _ from "lodash-es";
import type AttributeHash from "../gameObjects/AttributeHash.js";
import type IAttributeChoices from "../gameObjects/IAttributeChoices.js";

export default class AttributeRequirements extends Array<IAttributeChoices> {
  constructor(json: AttributeHash) {
    const attributes = _.map(json, (value, Key) => {
      let Values;
      if (Array.isArray(value)) {
        Values = value;
      } else if (value !== null) {
        Values = [value];
      }
      return { Key, Values };
    });
    super(...attributes);
  }
}