"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
const index_js_1 = require("../../json_out/index.js");
const badEnumError_js_1 = require("../../utils/logging/badEnumError.js");
const enumHas_js_1 = require("../../utils/validation/enumHas.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class Source {
    constructor(json, ...ancestorSourceJson) {
        // console.log(arguments);
        const sourceStack = lodash_es_1.default.cloneDeep([...lodash_es_1.default.compact(ancestorSourceJson)
                .reverse(),
            json]);
        const merged = sourceStack.reduce((a, b) => lodash_es_1.default.merge(a, b));
        // console.log("newData", newData);
        this.Title = merged.Title;
        this.Date = merged.Date;
        this.Page = merged.Page;
        if (!(0, enumHas_js_1.enumHas)(index_js_1.SourceTitle, this.Title)) {
            throw (0, badEnumError_js_1.badEnumError)(this.constructor, merged.Title, index_js_1.SourceTitle);
        }
    }
}
exports.Source = Source;
//# sourceMappingURL=Source.js.map