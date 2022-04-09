import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import { Oracle } from "../../../dist/classes/oracles/Oracle.js";
import { OracleCategoryDisplay } from "../../../dist/classes/oracles/OracleCategoryDisplay.js";
import { OracleUsage } from "../../../dist/classes/oracles/OracleUsage.js";
import { buildOracleId } from "../../../dist/utils/buildOracleId.js";
import { buildLog } from "../../../dist/utils/logging/buildLog.js";
import { propagateToChildren } from "../../../dist/utils/object_transform/propagateToChildren.js";
import _ from "lodash-es";
export class OracleCategory extends SourceInheritor {
    constructor(json, category, ...ancestorsJson) {
        super(json.Source ?? {}, ..._.compact(ancestorsJson.map(item => item.Source)));
        this.$id = buildOracleId(json, ...ancestorsJson);
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Description = json.Description;
        this.Display = new OracleCategoryDisplay(json.Display ?? {}, this.Name);
        this.Category = category ?? undefined;
        this["Sample Names"] = json["Sample Names"];
        if (json.Usage) {
            this.Usage = new OracleUsage(json.Usage);
        }
        if (json.Oracles) {
            this.Oracles = json.Oracles.map(oracleInfo => {
                if (json.Usage) {
                    propagateToChildren(json.Usage, "Usage", oracleInfo);
                }
                if (json.Requires) {
                    propagateToChildren(json.Requires, "Requires", oracleInfo);
                }
                return new Oracle(oracleInfo, this.$id, undefined, json, ...ancestorsJson);
            });
        }
        if (json.Categories) {
            this.Categories = json.Categories.map(oracleCat => {
                if (json.Usage) {
                    propagateToChildren(json.Usage, "Usage", oracleCat);
                }
                if (json.Requires) {
                    propagateToChildren(json.Requires, "Requires", oracleCat);
                }
                return new OracleCategory(oracleCat, this.$id, json, ...ancestorsJson);
            });
        }
    }
}
//# sourceMappingURL=OracleCategory.js.map