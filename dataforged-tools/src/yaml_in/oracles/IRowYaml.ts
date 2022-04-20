export type IRowRollYaml = [number | null, number | null];
export type IRowContentItemYaml = object | string;
export type IRowContentYaml = IRowContentItemYaml[];
type IRowYaml = [...IRowRollYaml, ...IRowContentYaml];
export { IRowYaml };