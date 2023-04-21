import _ from "lodash-es";
/**
 * @internal
 */
export class Source {
    constructor(json, ...ancestorSourceJson) {
        const sourceStack = _.cloneDeep([..._.compact(ancestorSourceJson)
                .reverse(),
            json]);
        const merged = sourceStack.reduce((a, b) => _.merge(a, b));
        if (!merged.Title) {
            throw Error("Unable to find title in source or ancestor source objects.");
        }
        this.Title = merged.Title;
        this.Date = merged.Date;
        this.Page = merged.Page;
        this.Url = merged.Url;
    }
}
//# sourceMappingURL=Source.js.map