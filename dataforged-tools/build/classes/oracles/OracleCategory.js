import { Oracle, OracleCategoryDisplay, OracleUsage, SourceInheritor, Title } from "../index.js";
import { buildOracleId } from "../../utils/buildOracleId.js";
import { buildLog } from "../../utils/logging/buildLog.js";
import { propagateToChildren } from "../../utils/object_transform/propagateToChildren.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class OracleCategory extends SourceInheritor {
    constructor(json, gamespace, category, ...ancestorsJson) {
        // if (!is<IOracleCategoryData>(json)) {
        //   buildLog(this.constructor, "Json does not conform to type!");
        //   throw new Error();
        // }
        super(json.Source ?? {}, ..._.compact(ancestorsJson.map(item => item.Source)));
        this.$id = buildOracleId(gamespace, json, ...ancestorsJson);
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Title = new Title(json.Title, this.$id);
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
                return new Oracle(oracleInfo, gamespace, this.$id, undefined, json, ...ancestorsJson);
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
                return new OracleCategory(oracleCat, gamespace, this.$id, json, ...ancestorsJson);
            });
        }
    }
}
//# sourceMappingURL=OracleCategory.js.map