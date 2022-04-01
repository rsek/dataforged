

import type OracleTableId from "./OracleTableId.js";

type TemplateString = `${string | ""}{{${OracleTableId}}}${string | ""}`;

export default TemplateString;