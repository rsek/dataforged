import t from 'ts-runtime/lib';
import IAttributeOptions from '../gameobjects/IAttributeOptions';

import IRequirements from './IRequirements';


export class Requirements implements IRequirements {
  Attributes: IAttributeOptions[];
  constructor(json: IRequirements) {
    if (!json.Attributes) {
      throw new Error(`[Requirements.constructor] Missing attribute data! ${JSON.stringify(json)}`);
    }
    // TODO: typecheck
    this.Attributes = json.Attributes;
  }
}
