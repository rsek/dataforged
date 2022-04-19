"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propagateToChildren = void 0;
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Propagates an object to child objects; each child receives the propagated object, but if it has any specified properties for that object, they take precedence.
 * @param objToPropagate - The object that will be merged into the children.
 * @param key - The key of the object to propagate.
 * @param children - The array of children to propagate the object to.
 */
function propagateToChildren(objToPropagate, key, ...children) {
    children.forEach(child => {
        if (!child[key]) {
            child[key] = {};
        }
        child[key] = lodash_es_1.default.merge(objToPropagate, child[key]);
    });
}
exports.propagateToChildren = propagateToChildren;
//# sourceMappingURL=propagateToChildren.js.map