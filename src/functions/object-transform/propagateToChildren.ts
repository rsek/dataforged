import _ from "lodash-es";

export default function propagateToChildren<C, T extends C[keyof C] & object>(objToPropagate: T, key: keyof C, ...children: C[]): void {
  children.forEach(child => {
    if (!child[key]) {
      child[key] = {} as T;
    }
    child[key] = _.merge(objToPropagate, child[key]);
  });
}

