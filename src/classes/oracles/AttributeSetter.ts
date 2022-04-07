import type IAttribute from "@dataforged/interfaces/json_out/common/IAttribute.js";
import _ from "lodash-es";
import type AttributeHash from "@dataforged/utils/types/AttributeHash.js";

export default class AttributeSetter extends Array<IAttribute> {
  constructor(json: AttributeHash) {
    if (Object.values(json).some(item => Array.isArray(item) && item.length > 1)) {
      throw new Error("[AttributeSetter] attribute hash can't be converted to attribute setter if it contains arrays longer than 1");
    }
    const attributes: IAttribute[] = _.map(json, (value, key) => {
      let newValue;
      if (Array.isArray(value)) {
        newValue = value[0];
      } else { newValue = value; }
      return { Key: key, Value: newValue };
    }) as IAttribute[];
    super(...attributes);
  }
}
