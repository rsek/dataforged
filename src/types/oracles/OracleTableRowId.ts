import OracleTableId from "./OracleTableId";


type OracleTableRowId = `${OracleTableId} / ${RollRange}`;
export default OracleTableRowId;

export type RollRange = number | `${number}-${number}`;
