import { Source } from "../../general/Source";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import IOracleData from './IOracleData';

export default interface IOracle extends IOracleData {
  $id: OracleTableId | OracleCategoryId;
  Source: Source;
}
