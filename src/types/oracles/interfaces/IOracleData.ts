import t from 'ts-runtime/lib';

import { ISource } from "../../general/Source";
import IOracleContent from "./IOracleContent";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import IOracleUsage from "./IOracleUsage";
import IDisplay from "../../general/Display";
import { MdString } from "../../general/MdString";

export default interface IOracleData {
  $id?: OracleTableId | OracleCategoryId | undefined;
  Name: string;
  Aliases?: string[] | undefined;
  Category?: OracleCategoryId | undefined;
  "Member of"?: OracleTableId | undefined;
  Description?: MdString | undefined;
  Source?: ISource | undefined;
  Display?: IDisplay | undefined;
  Usage?: IOracleUsage | undefined;
  Content?: IOracleContent | undefined;
}

