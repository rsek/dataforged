"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = void 0;
const jsonpath_1 = __importDefault(require("jsonpath"));
/**
 * Crawls a JSON tree for an object with a specific ID. Slow!
 * @param data - The data to search.
 * @param id - The id of the object to find.
 * @returns The object that matches the id.
 */
function findById(data, id) {
    return jsonpath_1.default.value(data, `$..[?(@.$id=="${id}")]`);
}
exports.findById = findById;
//# sourceMappingURL=findById.js.map