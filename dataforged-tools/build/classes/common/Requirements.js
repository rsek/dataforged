import { AttributeRequirements } from "../index.js";
/**
 * @internal
 */
export class Requirements {
    Attributes;
    constructor(json) {
        this.Attributes = new AttributeRequirements(json.Attributes);
    }
}
;
//# sourceMappingURL=Requirements.js.map