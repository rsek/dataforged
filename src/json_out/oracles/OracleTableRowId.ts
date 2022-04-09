import type { OracleTableId } from "@json_out/index.js";

type OracleTableRowId = `${OracleTableId} / ${RollRange}`;
export { OracleTableRowId };

export type RollRange = number | `${number}-${number}`;
