import { AttributeRequirements } from "../index.js";
/**
 * @internal
 */
export class Requirements {
    constructor(json) {
        this.Attributes = new AttributeRequirements(json.Attributes);
    }
}
;
//# sourceMappingURL=Requirements.js.map