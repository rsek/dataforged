import _ from "lodash";
import badJsonError from "../logging/badJsonError";

export default function propagateToChildren(objToPropagate: object, key: string, ...children: Record<string, any>[]): void {
  children.forEach(child => {
    if (!child[key]) {
      child[key] = {};
    }
    child[key] = _.merge(objToPropagate, child[key]);
  });
}

