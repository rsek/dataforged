import _ from "lodash";
import AttributeHash from "../gameObjects/AttributeHash";
import IAttributeChoices from "../gameObjects/IAttributeChoices";

export default class AttributeRequirements extends Array<IAttributeChoices> {
  constructor(json: AttributeHash) {
    const attributes = _.map(json, (value, Key) => {
      let Values;
      if (Array.isArray(value)) {
        Values = value;
      }
      else if (value != null) {
        Values = [value];
      }
      return { Key, Values };
    });
    super(...attributes);
  }
}