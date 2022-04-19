"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleCategory = void 0;
const index_js_1 = require("../index.js");
const buildOracleId_js_1 = require("../../utils/buildOracleId.js");
const buildLog_js_1 = require("../../utils/logging/buildLog.js");
const propagateToChildren_js_1 = require("../../utils/object_transform/propagateToChildren.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class OracleCategory extends index_js_1.SourceInheritor {
    constructor(json, gamespace, category, ...ancestorsJson) {
        var _a, _b;
        // if (!is<IOracleCategoryData>(json)) {
        //   buildLog(this.constructor, "Json does not conform to type!");
        //   throw new Error();
        // }
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, ...lodash_es_1.default.compact(ancestorsJson.map(item => item.Source)));
        this.$id = (0, buildOracleId_js_1.buildOracleId)(gamespace, json, ...ancestorsJson);
        (0, buildLog_js_1.buildLog)(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Description = json.Description;
        this.Display = new index_js_1.OracleCategoryDisplay((_b = json.Display) !== null && _b !== void 0 ? _b : {}, this.Name);
        this.Category = category !== null && category !== void 0 ? category : undefined;
        this["Sample Names"] = json["Sample Names"];
        if (json.Usage) {
            this.Usage = new index_js_1.OracleUsage(json.Usage);
        }
        if (json.Oracles) {
            this.Oracles = json.Oracles.map(oracleInfo => {
                if (json.Usage) {
                    (0, propagateToChildren_js_1.propagateToChildren)(json.Usage, "Usage", oracleInfo);
                }
                if (json.Requires) {
                    (0, propagateToChildren_js_1.propagateToChildren)(json.Requires, "Requires", oracleInfo);
                }
                return new index_js_1.Oracle(oracleInfo, gamespace, this.$id, undefined, json, ...ancestorsJson);
            });
        }
        if (json.Categories) {
            this.Categories = json.Categories.map(oracleCat => {
                if (json.Usage) {
                    (0, propagateToChildren_js_1.propagateToChildren)(json.Usage, "Usage", oracleCat);
                }
                if (json.Requires) {
                    (0, propagateToChildren_js_1.propagateToChildren)(json.Requires, "Requires", oracleCat);
                }
                return new OracleCategory(oracleCat, gamespace, this.$id, json, ...ancestorsJson);
            });
        }
    }
}
exports.OracleCategory = OracleCategory;
//# sourceMappingURL=OracleCategory.js.map