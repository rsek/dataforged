import { SourceTitle } from "../../json_out/index.js";
import { badEnumError } from "../../utils/logging/badEnumError.js";
import { enumHas } from "../../utils/validation/enumHas.js";
import _ from "lodash-es";
export class Source {
    constructor(json, ...ancestorSourceJson) {
        const sourceStack = _.compact(ancestorSourceJson)
            .reverse();
        const newData = _.merge(json, ...sourceStack);
        this.Title = newData.Title;
        if (!enumHas(SourceTitle, this.Title)) {
            throw badEnumError(this.constructor, this.Title, SourceTitle);
        }
        this.Date = newData.Date;
        this.Page = newData.Page;
    }
}
//# sourceMappingURL=Source.js.map