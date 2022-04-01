import type OracleTableId from "./OracleTableId.js";

type OracleTableRowId = `${OracleTableId} / ${RollRange}`;
export default OracleTableRowId;

export type RollRange = number | `${number}-${number}`;
