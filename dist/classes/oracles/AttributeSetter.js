import _ from "lodash-es";
/**
 * @internal
 */
export class AttributeSetter extends Array {
    constructor(json) {
        if (Object.values(json).some(item => Array.isArray(item) && item.length > 1)) {
            throw new Error("[AttributeSetter] attribute hash can't be converted to attribute setter if it contains arrays longer than 1");
        }
        const attributes = _.map(json, (value, key) => {
            let newValue;
            if (Array.isArray(value)) {
                newValue = value[0];
            }
            else {
                newValue = value;
            }
            return { Key: key, Value: newValue };
        });
        super(...attributes);
    }
}
//# sourceMappingURL=AttributeSetter.js.map