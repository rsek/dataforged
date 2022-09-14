
import { OracleSetDisplay, OracleTable  } from "@classes/index.js";
import { OracleBase } from "@classes/oracles/OracleBase.js";
import type { IOracleBase, IOracleSet } from "@json_out/index.js";
import { propagateToChildren } from "@utils/object_transform/propagateToChildren.js";
import type { IOracleSetYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class OracleSet extends OracleBase implements IOracleSet {
  Display: OracleSetDisplay;
  Tables?: OracleTable[] | undefined;
  Sets?: OracleSet[] | undefined;
  constructor(
    json: IOracleSetYaml,
    parentId: IOracleBase["$id"],
    ...ancestorsJson: (IOracleSetYaml)[]
  ) {
    super(json, parentId, ...ancestorsJson);
    const yamlData = this.yamlData as IOracleSetYaml;
    this.Display = new OracleSetDisplay(this.yamlData.Display ?? {}, this);
    this["Sample Names"] = yamlData["Sample Names"];
    if (yamlData.Tables) {
      this.Tables = yamlData.Tables.map(oracleInfo => {
        if (yamlData.Usage) {
          propagateToChildren(yamlData.Usage, "Usage", oracleInfo);
        }
        if (yamlData.Requires) {
          propagateToChildren(yamlData.Requires, "Requires", oracleInfo);
        }
        return new OracleTable(oracleInfo,this.$id, yamlData, ...ancestorsJson);
      });
    }
    if (yamlData.Sets) {
      this.Sets = yamlData.Sets.map(
        oracleSet => {
          if (yamlData.Usage) {
            propagateToChildren(yamlData.Usage, "Usage", oracleSet);
          }
          if (yamlData.Requires) {
            propagateToChildren(yamlData.Requires, "Requires", oracleSet);
          }
          return new OracleSet(oracleSet, this.$id, yamlData, ...ancestorsJson);
        }
      );
    }
  }
}