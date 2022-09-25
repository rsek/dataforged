import { OracleUsageBuilder, SourceInheritorBuilder, TitleBuilder } from "@builders";
import type { OracleBase, OracleDisplayBase, OracleSet, OracleTable, OracleTableRow, OracleUsage, RowNullStub, Title , YamlOracleSet, YamlOracleSetTemplate, YamlOracleTable, YamlOracleTableTemplate, YamlTitle } from "@schema";
import { formatId } from "@utils";
import { extractAncestors } from "@utils/extractAncestors.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { templateOracle } from "@utils/object_transform/templateOracle.js";
import { templateTableRows } from "@utils/object_transform/templateOracleTable.js";
import _ from "lodash-es";

/**
 * @see {@link OracleSet}, {@link OracleTable}
 * @internal
 */
export abstract class OracleBuilder extends SourceInheritorBuilder implements OracleBase {
  $id: OracleBase["$id"];
  Title: Title;
  Ancestors: OracleSet["$id"][];
  Aliases?: string[] | undefined;
  Display!: OracleDisplayBase;
  Summary?: string | undefined;
  Description?: string | undefined;
  Usage?: OracleUsage | undefined;
  Tables?: { [key:string]: OracleTable } | undefined;
  Sets?: { [key:string]: OracleSet } | undefined;
  Table?: (OracleTableRow|RowNullStub)[] | undefined;
  "Sample Names"?: string[];
  toJSON() {
    return _.omitBy(this, (key)=> typeof key === "string" && key.startsWith("_"));
  }
  private _yamlData: YamlOracleSet | YamlOracleTable;
  public get yamlData(): YamlOracleSet | YamlOracleTable {
    return this._yamlData;
  }
  constructor(
    json: (YamlOracleSet|YamlOracleSetTemplate|YamlOracleTable|YamlOracleTableTemplate) & {Table?: YamlOracleTable["Table"] | undefined},
    parentId: OracleBase["$id"],
    ...ancestorsJson: (YamlOracleSet)[]
  ) {
    let jsonClone = _.cloneDeep(json);
    const jsonOracleSet = jsonClone as Required<YamlOracleSetTemplate>;
    const jsonOracleTable = jsonClone as Required<YamlOracleTableTemplate>;
    if (jsonOracleSet._templateOracleSet) {
      jsonClone = templateOracle<YamlOracleSet>(jsonOracleSet, jsonOracleSet._templateOracleSet);
    }
    if (jsonOracleTable._templateOracleTable) {
      jsonClone = templateOracle<YamlOracleTable>(jsonOracleTable, jsonOracleTable._templateOracleTable);
    }
    if (jsonOracleTable._templateTableRows && jsonClone.Table) {
      jsonClone.Table = templateTableRows(jsonOracleTable._templateTableRows) as typeof jsonClone.Table;
    }
    super(
      jsonClone.Source ?? {},
      ..._.compact(ancestorsJson.map(item => item.Source))
    );

    const fragment = jsonClone._idFragment ?? jsonClone.Title?.Short ?? jsonClone.Title?.Standard ?? jsonClone.Title?.Canonical;
    if (!fragment) {
      throw new Error();
    }
    this.$id = formatId(fragment,parentId);
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Title = new TitleBuilder(jsonClone.Title as YamlTitle, this);
    this.Ancestors = extractAncestors(this.$id);
    this.Summary = jsonClone.Summary;
    this.Description = jsonClone.Description;
    // this is just so it's ordered nicely
    this.Display = { $id: formatId("Display",this.$id) };
    if (jsonClone.Usage) {
      this.Usage = new OracleUsageBuilder(jsonClone.Usage);
    }
    // readonly data to be used by descendant classes
    this._yamlData=jsonClone as YamlOracleSet | YamlOracleTable;
  }
}