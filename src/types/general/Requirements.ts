import t from 'ts-runtime/lib';
import _ from 'lodash';
import IAttributeOptions from '../gameobjects/IAttributeOptions';
import IRequirements from './interfaces/IRequirements';
import IRequirementsData from "./interfaces/IRequirementsData";


export default class Requirements implements IRequirements {
  Attributes: IAttributeOptions[];
  constructor(json: IRequirementsData) {
    if (!json.Attributes) {
      throw new Error(`[Requirements] Missing attribute data! ${JSON.stringify(json)}`);
    }
    // TODO: typecheck
    this.Attributes = _.map(json.Attributes, (value, key) => {
      if (!Array.isArray(value)) {
        value = [value];
      }
      return { Key: key, Values: value } as IAttributeOptions;
    });
  }
}
