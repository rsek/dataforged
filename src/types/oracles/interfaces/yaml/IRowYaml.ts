import AttributeHash from "../../../gameObjects/AttributeHash";
import GameObjectData from "../../../gameObjects/GameObjectYaml";
import ISuggestionsYaml from "../../../general/interfaces/ISuggestionsYaml";
import UrlString from "../../../general/UrlString";
import TemplateString from "../../TemplateString";
import IMultipleRolls from "../IMultipleRolls";
import IRow from "../IRow";


export type IRowRollYaml = [number | null, number | null];
export type IRowContentItemYaml = object | string;
export type IRowContentYaml = IRowContentItemYaml[];
type IRowYaml = [...IRowRollYaml, ...IRowContentYaml];
export default IRowYaml;