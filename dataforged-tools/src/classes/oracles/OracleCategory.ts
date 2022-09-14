
import { Display, Oracle  , OracleUsage , SourceInheritor , Title  } from "@classes/index.js";
import type { Gamespace , IOracleCategory } from "@json_out/index.js";
import { buildOracleId } from "@utils/buildOracleId.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { propagateToChildren } from "@utils/object_transform/propagateToChildren.js";
import type { IOracleCategoryYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class OracleCategory extends SourceInheritor implements IOracleCategory {
  $id: IOracleCategory["$id"];
  Title: Title;
  Aliases?: string[] | undefined;
  Category?: IOracleCategory["$id"] | undefined;
  Description?: string | undefined;
  Display: Display;
  Usage?: OracleUsage | undefined;
  Oracles?: Oracle[] | undefined;
  Categories?: OracleCategory[] | undefined;
  "Sample Names"?: string[];
  Summary?: string | undefined;
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
    this.Title = new Title(json.Title, this);
    this.Aliases = json.Aliases;
    this.Summary = json.Summary;
    this.Description = json.Description;
    this.Display = new Display(json.Display??{});
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