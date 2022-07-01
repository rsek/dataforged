
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
import { Oracle , OracleCategoryDisplay , OracleUsage , SourceInheritor } from "@classes/index.js";
import type { Gamespace , IOracleCategory } from "@json_out/index.js";
import { buildOracleId } from "@utils/buildOracleId.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { propagateToChildren } from "@utils/object_transform/propagateToChildren.js";
import type { IOracleCategoryYaml, IOracleYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class OracleCategory extends SourceInheritor implements IOracleCategory {
  $id: IOracleCategory["$id"];
  Name: string;
  Aliases?: string[] | undefined;
  Category?: IOracleCategory["$id"] | undefined;
  Description?: string | undefined;
  Display: OracleCategoryDisplay;
  Usage?: OracleUsage | undefined;
  Oracles?: Oracle[] | undefined;
  Categories?: OracleCategory[] | undefined;
  "Sample Names"?: string[];
  constructor(
    json: IOracleCategoryYaml,
    gamespace: Gamespace,
    category?: IOracleCategory["$id"] | undefined,
    ...ancestorsJson: (IOracleCategoryYaml)[]
  ) {
    // if (!is<IOracleCategoryData>(json)) {
    //   buildLog(this.constructor, "Json does not conform to type!");
    //   throw new Error();
    // }
    super(json.Source ?? {}, ..._.compact(ancestorsJson.map(item => item.Source)));

    this.$id = buildOracleId<IOracleCategory["$id"]>(gamespace, json, ...ancestorsJson);
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
        return new Oracle(oracleInfo, gamespace,this.$id, undefined, json, ...ancestorsJson);
      });
    }
    if (json.Categories) {
      this.Categories = json.Categories.map(
        oracleCat => {
          if (json.Usage) {
            propagateToChildren(json.Usage, "Usage", oracleCat);
          }
          if (json.Requires) {
            propagateToChildren(json.Requires, "Requires", oracleCat);
          }
          return new OracleCategory(oracleCat, gamespace, this.$id, json, ...ancestorsJson);
        }
      );
    }
  }
}