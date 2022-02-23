import _ from "lodash";

export default function propagateObject(objToPropagate: object, key: string, ...children: Record<string, any>[]): void {
  children.forEach(child => {
    if (!child[key]) {
      child[key] = {};
    }
    if (typeof child[key] != "object") {
      throw new Error("Child's key does not contain an object.");
    }
    child[key] = _.merge(objToPropagate, child[key]);
  });
}

