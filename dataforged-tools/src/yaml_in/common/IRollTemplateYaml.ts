import type { IRollTemplate } from "@json_out/index.js";

/**
 * @internal
 */
export interface IRollTemplateYaml extends Omit<IRollTemplate, "$id"> { }
