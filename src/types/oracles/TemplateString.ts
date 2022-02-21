
import t from 'ts-runtime/lib';
import OracleTableId from "./OracleTableId";

type TemplateString = `${string | ""}{{${OracleTableId}}}${string | ""}`;

export default TemplateString;