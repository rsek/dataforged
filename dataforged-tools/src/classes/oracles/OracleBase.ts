import { SourceInheritor } from "@classes/common/SourceInheritor.js";
import { Title } from "@classes/common/Title.js";
import type { OracleSet } from "@classes/oracles/OracleSet.js";
import type { OracleTable } from "@classes/oracles/OracleTable.js";
import { OracleUsage } from "@classes/oracles/OracleUsage.js";
import type { Row, RowNullStub } from "@classes/oracles/Row.js";
import type { IOracleBase, IOracleDisplayBase, IOracleSet } from "@json_out/index.js";
import { extractAncestors } from "@utils/extractAncestors.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { templateOracle } from "@utils/object_transform/templateOracle.js";
import { templateOracleTable } from "@utils/object_transform/templateOracleTable.js";
import type { IOracleSetYaml, IOracleTableYaml, ITemplateYamlBase } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export abstract class OracleBase extends SourceInheritor implements IOracleBase {
  $id: IOracleBase["$id"];
  Title: Title;
  Ancestors: IOracleSet["$id"][];
  Aliases?: string[] | undefined;
  Display!: IOracleDisplayBase;
  Summary?: string | undefined;
  Description?: string | undefined;
  Usage?: OracleUsage | undefined;
  Tables?: OracleTable[] | undefined;
  Sets?: OracleSet[] | undefined;
  Table?: (Row|RowNullStub)[] | undefined;
  "Sample Names"?: string[];
  toJSON() {
    return _.omit(this, ["_yamlData"]);
  }
  private _yamlData: IOracleSetYaml | IOracleTableYaml;
  public get yamlData(): IOracleSetYaml | IOracleTableYaml {
    return this._yamlData;
  }
  public set yamlData(value: IOracleSetYaml | IOracleTableYaml) {
    this._yamlData = value;
  }
  constructor(
    json: IOracleSetYaml|IOracleTableYaml,
    parentId: IOracleBase["$id"],
    ...ancestorsJson: (IOracleSetYaml)[]
  ) {
    let jsonClone = _.cloneDeep(json);
    const jsonSet = jsonClone as IOracleSetYaml;
    const jsonTable = jsonClone as IOracleTableYaml;
    if (jsonSet._templateOracleSet) {
      jsonClone = templateOracle<IOracleSetYaml>(jsonSet, jsonSet._templateOracleSet as ITemplateYamlBase);
    }
    if (jsonTable._templateOracleTable) {
      // console.log("Building from oracle table template.");
      jsonClone = templateOracle<IOracleTableYaml>(jsonTable, jsonTable._templateOracleTable as ITemplateYamlBase);
    }
    if (jsonTable._templateTableRows) {
      // console.log("Building from table row template.");
      (jsonClone as IOracleTableYaml).Table = templateOracleTable(jsonTable._templateTableRows);
    }
    super(
      jsonClone.Source ?? {},
      ..._.compact(ancestorsJson.map(item => item.Source))
    );

    console.log("building from json", jsonClone);
    const fragment = jsonClone._idFragment ?? jsonClone.Title?.Short ?? jsonClone.Title?.Standard ?? jsonClone.Title?.Canonical;
    if (!fragment) {
      console.log(jsonClone);
      throw new Error();
    }
    this.$id = parentId + "/" + formatIdFragment(fragment);
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Title = new Title(jsonClone.Title, this);
    this.Ancestors = extractAncestors(this.$id);
    this.Aliases = jsonClone.Aliases;
    this.Summary = jsonClone.Summary;
    this.Description = jsonClone.Description;
    // this is just so it's ordered nicely
    this.Display = { $id: this.$id+"/Display" };
    if (jsonClone.Usage) {
      this.Usage = new OracleUsage(jsonClone.Usage);
    }
    // readonly data to be used by descendant classes
    this._yamlData=jsonClone;
  }
}