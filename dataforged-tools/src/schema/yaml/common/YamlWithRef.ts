
/**
 * @internal
 */
export interface YamlWithRef {
  _refs?:  {[key: string]: object} | undefined;
  _templates?:  {[key: string]: object} | undefined;
}
