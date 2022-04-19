"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oracle = void 0;
const index_js_1 = require("../index.js");
const buildOracleId_js_1 = require("../../utils/buildOracleId.js");
const inferSetsAttributes_js_1 = require("../../utils/object_transform/inferSetsAttributes.js");
const propagateToChildren_js_1 = require("../../utils/object_transform/propagateToChildren.js");
const templateOracle_js_1 = require("../../utils/object_transform/templateOracle.js");
const templateOracleTable_js_1 = require("../../utils/object_transform/templateOracleTable.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class Oracle extends index_js_1.SourceInheritor {
    constructor(json, gamespace, category, memberOf, ...ancestorsJson
    // ancestors should be in ascending order
    ) {
        var _a, _b, _c;
        let jsonClone = lodash_es_1.default.cloneDeep(json);
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, ...lodash_es_1.default.compact(ancestorsJson.map(item => item.Source)));
        if (jsonClone._templateInfo) {
            jsonClone = (0, templateOracle_js_1.templateOracle)(jsonClone, jsonClone._templateInfo);
        }
        // if (!is<IOracleInfoData>(json)) {
        //   throw new Error("json does not conform to IOracleInfoData!");
        // }
        this.$id = (0, buildOracleId_js_1.buildOracleId)(gamespace, jsonClone, ...ancestorsJson);
        // buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = jsonClone.Name;
        this.Aliases = jsonClone.Aliases;
        this["Member of"] = memberOf !== null && memberOf !== void 0 ? memberOf : undefined;
        this.Category = category;
        this.Description = jsonClone.Description;
        this.Display = new index_js_1.OracleDisplay(((_b = jsonClone.Display) !== null && _b !== void 0 ? _b : {}), this.Name, this.$id);
        if (jsonClone.Usage) {
            this.Usage = new index_js_1.OracleUsage(jsonClone.Usage);
        }
        if (jsonClone.Content) {
            this.Content = new index_js_1.OracleContent(jsonClone.Content);
        }
        let tableData;
        if (jsonClone._templateTable) {
            tableData = (0, templateOracleTable_js_1.templateOracleTable)(jsonClone._templateTable);
        }
        else {
            tableData = jsonClone.Table;
        }
        if (tableData) {
            this.Table = tableData.map(row => {
                // TODO: propagate attributes to row objects
                const newRow = new index_js_1.Row(this.$id, row);
                newRow.validateRollTemplate();
                return newRow;
            });
        }
        if (jsonClone.Oracles) {
            this.Oracles = jsonClone.Oracles.map(oracleInfo => {
                if (jsonClone.Usage) {
                    (0, propagateToChildren_js_1.propagateToChildren)(jsonClone.Usage, "Usage", oracleInfo);
                }
                if (jsonClone.Content) {
                    (0, propagateToChildren_js_1.propagateToChildren)(jsonClone.Content, "Content", oracleInfo);
                }
                return new Oracle(oracleInfo, gamespace, this.Category, this.$id, jsonClone, ...ancestorsJson);
            });
        }
        if (this.Table) {
            const attrs = (0, inferSetsAttributes_js_1.inferSetsAttributes)(this.Table);
            if (attrs.length > 0) {
                if (!this.Usage) {
                    this.Usage = {};
                }
                if (typeof this.Usage["Sets attributes"] === "undefined") {
                    this.Usage["Sets attributes"] = [];
                }
                this.Usage["Sets attributes"] = this.Usage["Sets attributes"].concat(...attrs);
            }
        }
        if (this.Oracles) {
            const keys = new Set();
            if (!this.Usage) {
                this.Usage = {};
            }
            if ((_c = this.Usage) === null || _c === void 0 ? void 0 : _c["Sets attributes"]) {
                this.Usage["Sets attributes"].map((item) => item.Key).forEach(key => keys.add(key));
            }
            this.Oracles.forEach(oracle => {
                var _a;
                if ((_a = oracle.Usage) === null || _a === void 0 ? void 0 : _a["Sets attributes"]) {
                    oracle.Usage["Sets attributes"].map((item) => item.Key).forEach(key => keys.add(key));
                }
            });
            if (keys.size > 0) {
                this.Usage["Sets attributes"] = Array.from(keys).map(key => { return { Key: key }; });
            }
        }
    }
}
exports.Oracle = Oracle;
//# sourceMappingURL=Oracle.js.map