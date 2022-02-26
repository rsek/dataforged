import t from 'ts-runtime/lib';
import _ from 'lodash';
import IRequirements from './interfaces/IRequirements';
import IRequirementsData from "./interfaces/IRequirementsData";
import AttributeRequirements from './Attributes';

export default class Requirements implements IRequirements {
  Attributes: AttributeRequirements;
  constructor(json: IRequirementsData) {
    this.Attributes = new AttributeRequirements(json.Attributes);
  }
}
