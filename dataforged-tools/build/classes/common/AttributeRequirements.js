/* eslint-disable @typescript-eslint/naming-convention */
import _ from "lodash-es";
/**
 * @internal
 */
export class AttributeRequirements extends Array {
    constructor(json) {
        super();
        _.forEach(json, (value, key) => {
            let values;
            if (Array.isArray(value)) {
                values = value;
            }
            else if (value !== null) {
                values = [value];
            }
            const Key = key;
            const Values = values;
            this.push({ Key, Values });
        });
    }
}
//# sourceMappingURL=AttributeRequirements.js.map