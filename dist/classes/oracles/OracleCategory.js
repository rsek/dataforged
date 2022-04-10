import { SourceInheritor } from "../index.js";
import { Oracle } from "../index.js";
import { OracleCategoryDisplay } from "../index.js";
import { OracleUsage } from "../index.js";
import { buildOracleId } from "../../utils/buildOracleId.js";
import { buildLog } from "../../utils/logging/buildLog.js";
import { propagateToChildren } from "../../utils/object_transform/propagateToChildren.js";
import _ from "lodash-es";
export class OracleCategory extends SourceInheritor {
    constructor(json, category, ...ancestorsJson) {
        // if (!is<IOracleCategoryData>(json)) {
        //   buildLog(this.constructor, "Json does not conform to type!");
        //   throw new Error();
        // }
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