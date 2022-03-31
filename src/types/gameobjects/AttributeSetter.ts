import _ from "lodash-es";
import AttributeHash from "./AttributeHash";
import IAttribute from "./IAttribute";

export default class AttributeSetter extends Array<IAttribute> {
  constructor(json: AttributeHash) {
    if (Object.values(json).some(item => Array.isArray(item) && item.length > 1)) {
      throw new Error("[AttributeSetter] attribute hash can't be converted to attribute setter if it contains arrays longer than 1");
    }
    const attributes: IAttribute[] = _.map(json, (value, Key) => {
      let Value;
      if (Array.isArray(value)) {
        Value = value[0];
      } else { Value = value; }
      return { Key, Value };
    }) as IAttribute[];
    super(...attributes);
  }
}
