import type { YamlOracleSet, YamlOracleTable, YamlRowContentItem, YamlRowRoll, YamlSimpleTableRow } from "@schema";

/**
 * @internal
 */
export interface YamlTemplateBase {
  _templateVars?: {
    [key: string]: string
  } | undefined;
}

/**
 * @internal
 */
export interface YamlOracleSetTemplate extends Partial<Omit<YamlOracleSet,"Tables"|"Sets">>, YamlTemplateBase {
  _templateOracleSet?: Partial<YamlOracleSet>|undefined
  Tables?: {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
    [key: string]: YamlOracleTableTemplate
  } | undefined
  Sets?: {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
    [key:string]: YamlOracleSetTemplate
  } | undefined
}

/**
 * @internal
 */
export interface YamlOracleTableTemplate extends Partial<YamlOracleTable>, YamlTemplateBase {
  _templateOracleTable?: Partial<YamlOracleTable> | undefined;
  _templateTableRows?: YamlTemplateTable | undefined;
}

/**
 * @internal
 */
export interface YamlTemplateTable {
  rolls: (YamlSimpleTableRow | YamlRowRoll)[];
  content: (YamlSimpleTableRow | YamlRowContentItem[] | string)[];
}
