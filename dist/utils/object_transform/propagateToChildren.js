import _ from "lodash-es";
export function propagateToChildren(objToPropagate, key, ...children) {
    children.forEach(child => {
        if (!child[key]) {
            child[key] = {};
        }
        child[key] = _.merge(objToPropagate, child[key]);
    });
}
//# sourceMappingURL=propagateToChildren.js.map