import t from 'ts-runtime/lib';

import ISource from "../../general/interfaces/ISource";
import IOracleContent from "./IOracleContent";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import IDisplay from "../../general/Display";
import MdString from "../../general/MdString";
import IOracleUsageData from './IOracleUsageData';

export default interface IOracleData {
  $id?: OracleTableId | OracleCategoryId | undefined;
  Name: string;
  Aliases?: string[] | undefined;
  Category?: OracleCategoryId | undefined;
  "Member of"?: OracleTableId | undefined;
  Description?: MdString | undefined;
  Source?: ISource | undefined;
  Display?: IDisplay | undefined;
  Usage?: IOracleUsageData | undefined;
  Content?: IOracleContent | undefined;
}

