
import { OracleBuilder, OracleSetDisplayBuilder  , OracleTableBuilder } from "@builders";
import type { OracleBase, OracleSet, OracleSetDisplay, OracleTable } from "@schema_json";
import type { YamlOracleSet, YamlOracleTable } from "@schema_yaml";
import { propagateToChildren } from "@utils/object_transform/propagateToChildren.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class OracleSetBuilder extends OracleBuilder implements OracleSet {
  Display: OracleSetDisplay;
  Tables?: {[key:string]: OracleTable} | undefined;
  Sets?: {[key:string]: OracleSet} | undefined;
  constructor(
    json: YamlOracleSet,
    parentId: OracleBase["$id"],
    ...ancestorsJson: (YamlOracleSet)[]
  ) {
    super(json, parentId, ...ancestorsJson);
    const yamlData = this.yamlData as YamlOracleSet;
    this.Display = new OracleSetDisplayBuilder(this.yamlData.Display ?? {}, this);
    this["Sample Names"] = yamlData["Sample Names"];
    if (yamlData.Tables) {
      this.Tables = _.mapValues(yamlData.Tables,oracleInfo => {
        if (yamlData.Usage) {
          propagateToChildren(yamlData.Usage, "Usage", oracleInfo);
        }
        if (yamlData.Requires) {
          propagateToChildren(yamlData.Requires, "Requires", oracleInfo);
        }
        return new OracleTableBuilder(oracleInfo as YamlOracleTable,this.$id, yamlData, ...ancestorsJson);
      });
    }
    if (yamlData.Sets) {
      this.Sets = _.mapValues(yamlData.Sets,
        oracleSet => {
          if (yamlData.Usage) {
            propagateToChildren(yamlData.Usage, "Usage", oracleSet);
          }
          if (yamlData.Requires) {
            propagateToChildren(yamlData.Requires, "Requires", oracleSet);
          }
          return new OracleSetBuilder(oracleSet as YamlOracleSet, this.$id, yamlData, ...ancestorsJson);
        }
      );
    }
  }
}