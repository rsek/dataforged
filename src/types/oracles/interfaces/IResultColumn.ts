import OracleTableId from "../OracleTableId";
import OracleTableRow from "../classes/OracleTableRow";
import ITableColumn from "./ITableColumn";


export default interface IResultColumn extends ITableColumn {
  Label: string;
  Content: OracleTableId;
  Key: keyof OracleTableRow;
}
