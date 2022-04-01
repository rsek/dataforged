import AttributeHash from "../../../gameObjects/AttributeHash.js";
import GameObjectData from "../../../gameObjects/GameObjectYaml.js";
import ISuggestionsYaml from "../../../general/interfaces/ISuggestionsYaml.js";
import UrlString from "../../../general/UrlString.js";
import TemplateString from "../../TemplateString.js";
import IMultipleRolls from "../IMultipleRolls.js";
import IRow from "../IRow.js";

export type IRowRollYaml = [number | null, number | null];
export type IRowContentItemYaml = object | string;
export type IRowContentYaml = IRowContentItemYaml[];
type IRowYaml = [...IRowRollYaml, ...IRowContentYaml];
export default IRowYaml;