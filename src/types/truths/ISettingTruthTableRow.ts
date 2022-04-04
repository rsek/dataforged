import type { SettingTruthId } from "./SettingTruth.js";
import type MdString from "../general/MdString.js";
import type IRow from "../oracles/interfaces/IRow.js";

export type SettingTruthTableRowId = `${SettingTruthId} / ${number}` | `${SettingTruthId} / ${number}-${number}`;

export default interface ISettingTruthTableRow extends Omit<IRow, "$id"> {
  $id: SettingTruthTableRowId;
  "Quest Starter": MdString;
  Description: MdString;
}