import { DisplayOracle, OracleContent, OracleUsage, Row, SourceInheritor } from "../index.js";
import { buildOracleId } from "../../utils/buildOracleId.js";
import { inferSetsAttributes } from "../../utils/object_transform/inferSetsAttributes.js";
import { propagateToChildren } from "../../utils/object_transform/propagateToChildren.js";
import { templateOracle } from "../../utils/object_transform/templateOracle.js";
import { templateOracleTable } from "../../utils/object_transform/templateOracleTable.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class Oracle extends SourceInheritor {
    constructor(json, gamespace, category, memberOf, ...ancestorsJson
    // ancestors should be in ascending order
    ) {
        var _a, _b, _c;
        let jsonClone = _.cloneDeep(json);
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, ..._.compact(ancestorsJson.map(item => item.Source)));
        if (jsonClone._templateInfo) {
            jsonClone = templateOracle(jsonClone, jsonClone._templateInfo);
        }
        // if (!is<IOracleInfoData>(json)) {
        //   throw new Error("json does not conform to IOracleInfoData!");
        // }
        this.$id = buildOracleId(gamespace, jsonClone, ...ancestorsJson);
        // buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = jsonClone.Name;
        this.Aliases = jsonClone.Aliases;
        this["Member of"] = memberOf !== null && memberOf !== void 0 ? memberOf : undefined;
        this.Category = category;
        this.Description = jsonClone.Description;
        this.Display = new DisplayOracle(((_b = jsonClone.Display) !== null && _b !== void 0 ? _b : {}), this.Name, this.$id);
        if (jsonClone.Usage) {
            this.Usage = new OracleUsage(jsonClone.Usage);
        }
        if (jsonClone.Content) {
            this.Content = new OracleContent(jsonClone.Content);
        }
        let tableData;
        if (jsonClone._templateTable) {
            tableData = templateOracleTable(jsonClone._templateTable);
        }
        else {
            tableData = jsonClone.Table;
        }
        if (tableData) {
            this.Table = tableData.map(row => {
                // TODO: propagate attributes to row objects
                const newRow = new Row(this.$id, row);
                return newRow;
            });
        }
        if (jsonClone.Oracles) {
            this.Oracles = jsonClone.Oracles.map(oracleInfo => {
                if (jsonClone.Usage) {
                    propagateToChildren(jsonClone.Usage, "Usage", oracleInfo);
                }
                if (jsonClone.Content) {
                    propagateToChildren(jsonClone.Content, "Content", oracleInfo);
                }
                return new Oracle(oracleInfo, gamespace, this.Category, this.$id, jsonClone, ...ancestorsJson);
            });
        }
        if (this.Table) {
            const attrs = inferSetsAttributes(this.Table);
            if (attrs.length > 0) {
                if (!this.Usage) {
                    this.Usage = {};
                }
                if (typeof this.Usage["Sets"] === "undefined") {
                    this.Usage["Sets"] = [];
                }
                this.Usage["Sets"] = this.Usage["Sets"].concat(...attrs);
            }
        }
        if (this.Oracles) {
            const keys = new Set();
            if (!this.Usage) {
                this.Usage = {};
            }
            if ((_c = this.Usage) === null || _c === void 0 ? void 0 : _c["Sets"]) {
                this.Usage["Sets"].map((item) => item.Key).forEach(key => keys.add(key));
            }
            this.Oracles.forEach(oracle => {
                var _a;
                if ((_a = oracle.Usage) === null || _a === void 0 ? void 0 : _a["Sets"]) {
                    oracle.Usage["Sets"].map((item) => item.Key).forEach(key => keys.add(key));
                }
            });
            if (keys.size > 0) {
                this.Usage["Sets"] = Array.from(keys).map(key => { return { Key: key }; });
            }
        }
    }
}
//# sourceMappingURL=Oracle.js.map