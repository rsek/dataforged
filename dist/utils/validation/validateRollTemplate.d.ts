import type { IHasRollTemplate, MdString, RollTemplate, RollTemplateString } from "@dataforged/json_out/index.js";
export declare function validateRollTemplate<T extends IHasRollTemplate<string>>(parent: T, templateObj: RollTemplate<string & keyof T>): RollTemplate<string & keyof T>;
export declare function validateRollTemplateString(str: MdString): RollTemplateString;
//# sourceMappingURL=validateRollTemplate.d.ts.map