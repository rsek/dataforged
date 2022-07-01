//License: MIT
export type IRowRollYaml = [number | null, number | null];
/**
 * @internal
 */
export type IRowContentItemYaml = object | string;
/**
 * @internal
 */
export type IRowContentYaml = IRowContentItemYaml[];
/**
 * @internal
 */
export type IRowYaml = [...IRowRollYaml, ...IRowContentYaml];