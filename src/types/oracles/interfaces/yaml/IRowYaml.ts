import AttributeHash from "../../../gameobjects/AttributeHash";
import GameObjectData from "../../../gameobjects/GameObjectYaml";
import ISuggestionsYaml from "../../../general/interfaces/ISuggestionsYaml";
import UrlString from "../../../general/UrlString";
import TemplateString from "../../TemplateString";
import IMultipleRolls from "../IMultipleRolls";
import IRow from "../IRow";


export type IRowRollYaml = [number | null, number | null];
export type IRowContentItemYaml = object | string;
export type IRowContentYaml = IRowContentItemYaml[];
export type IRowYaml = [...IRowRollYaml, ...IRowContentYaml];
export default IRowYaml;