import _ from "lodash";
import AttributeHash from "../gameobjects/AttributeHash";
import IAttribute from "../gameobjects/IAttribute";

export default class Attributes extends Array<IAttribute> {
  constructor(json: AttributeHash) {
    let attrObj = _.omitBy(json, (value, key) => typeof value == "undefined" || key == "Object type");
    let attributes = _.map(attrObj, (Value, Key) => {
      if (!Array.isArray(Value)) {
        Value = [Value];
      }
      return { Key, Value } as IAttribute;
    });
    super(...attributes);
  }
}