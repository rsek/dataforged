import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import { OracleContent } from "../../../dist/classes/oracles/OracleContent.js";
import { OracleDisplay } from "../../../dist/classes/oracles/OracleDisplay.js";
import { OracleUsage } from "../../../dist/classes/oracles/OracleUsage.js";
import { Row } from "../../../dist/classes/oracles/Row.js";
import { buildOracleId } from "../../../dist/utils/buildOracleId.js";
import { buildLog } from "../../../dist/utils/logging/buildLog.js";
import { inferSetsAttributes } from "../../../dist/utils/object_transform/inferSetsAttributes.js";
import { propagateToChildren } from "../../../dist/utils/object_transform/propagateToChildren.js";
import { templateOracle } from "../../../dist/utils/object_transform/templateOracle.js";
import { templateOracleTable } from "../../../dist/utils/object_transform/templateOracleTable.js";
import _ from "lodash-es";
export class Oracle extends SourceInheritor {
    constructor(json, category, memberOf, ...ancestorsJson) {
        let jsonClone = _.cloneDeep(json);
        super(jsonClone.Source ?? {}, ..._.compact(ancestorsJson.map(item => item.Source)));
        if (jsonClone._templateInfo) {
            jsonClone = templateOracle(jsonClone, jsonClone._templateInfo);
        }
        this.$id = buildOracleId(jsonClone, ...ancestorsJson);
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = jsonClone.Name;
        this.Aliases = jsonClone.Aliases;
        this["Member of"] = memberOf ?? undefined;
        this.Category = category;
        this.Description = jsonClone.Description;
        this.Display = new OracleDisplay((jsonClone.Display ?? {}), this.Name, this.$id);
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
                const newRow = new Row(this.$id, row);
                newRow.validateRollTemplate();
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
                return new Oracle(oracleInfo, this.Category, this.$id, jsonClone, ...ancestorsJson);
            });
        }
        if (this.Table) {
            const attrs = inferSetsAttributes(this.Table);
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
            if (this.Usage?.["Sets attributes"]) {
                this.Usage["Sets attributes"].map((item) => item.Key).forEach(key => keys.add(key));
            }
            this.Oracles.forEach(oracle => {
                if (oracle.Usage?.["Sets attributes"]) {
                    oracle.Usage["Sets attributes"].map((item) => item.Key).forEach(key => keys.add(key));
                }
            });
            if (keys.size > 0) {
                this.Usage["Sets attributes"] = Array.from(keys).map(key => { return { Key: key }; });
            }
        }
    }
}
//# sourceMappingURL=Oracle.js.map