import { AttributeRequirements } from "@classes/index.js";
/**
 * @internal
 */
export class Requirements {
    constructor(json) {
        this.Attributes = new AttributeRequirements(json.Attributes);
    }
}
;
