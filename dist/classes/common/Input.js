import { InputType } from "../../../dist/json_out/common/InputType.js";
import { ClockType } from "../../../dist/json_out/index.js";
import { is } from "typescript-is";
export class NumberInput {
    constructor(json, id) {
        this.Min = 0;
        this.Step = 1;
        this["Starting Value"] = 0;
        this.Adjustable = true;
        this.$id = id;
        Object.assign(this, json);
    }
}
export class ClockInput {
    constructor(json, id) {
        this["Input Type"] = InputType.Clock;
        this["Clock Type"] = ClockType.Tension;
        this.Filled = 0;
        this.Adjustable = true;
        this.$id = id;
        Object.assign(this, json);
    }
}
export class TextInput {
    constructor(json, id) {
        this.Adjustable = false;
        this.$id = id;
        Object.assign(this, json);
    }
}
export class SelectInput {
    constructor(json, id) {
        this.Adjustable = false;
        this.$id = id;
        this.Name = json.Name;
        this["Input Type"] = json["Input Type"];
        this.Options = json.Options.map(optionJson => {
            let option;
            if (is(optionJson, object => { function _undefined(object) { ; if (object !== undefined)
                return {};
            else
                return null; } function _string(object) { ; if (typeof object !== "string")
                return {};
            else
                return null; } function _null(object) { ; if (object !== null)
                return {};
            else
                return null; } function su__undefined__string_eu(object) { var conditions = [_undefined, _string]; for (const condition of conditions) {
                var error = condition(object);
                if (!error)
                    return null;
            } return {}; } function _5(object) { ; if (object !== "Edge")
                return {};
            else
                return null; } function _6(object) { ; if (object !== "Heart")
                return {};
            else
                return null; } function _7(object) { ; if (object !== "Iron")
                return {};
            else
                return null; } function _8(object) { ; if (object !== "Shadow")
                return {};
            else
                return null; } function _9(object) { ; if (object !== "Wits")
                return {};
            else
                return null; } function su__5__6__7__8__9_eu(object) { var conditions = [_5, _6, _7, _8, _9]; for (const condition of conditions) {
                var error = condition(object);
                if (!error)
                    return null;
            } return {}; } function _0(object) { ; if (typeof object !== "object" || object === null || Array.isArray(object))
                return {}; {
                if ("$id" in object) {
                    var error = su__undefined__string_eu(object["$id"]);
                    if (error)
                        return error;
                }
            } {
                if ("Name" in object) {
                    var error = _string(object["Name"]);
                    if (error)
                        return error;
                }
                else
                    return {};
            } {
                if ("Stat" in object) {
                    var error = su__5__6__7__8__9_eu(object["Stat"]);
                    if (error)
                        return error;
                }
                else
                    return {};
            } return null; } return _0(object); })) {
                option = new AssetSelectInputStatOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
            }
            else if (is(optionJson, object => { function _undefined(object) { ; if (object !== undefined)
                return {};
            else
                return null; } function _string(object) { ; if (typeof object !== "string")
                return {};
            else
                return null; } function _null(object) { ; if (object !== null)
                return {};
            else
                return null; } function su__undefined__string_eu(object) { var conditions = [_undefined, _string]; for (const condition of conditions) {
                var error = condition(object);
                if (!error)
                    return null;
            } return {}; } function _5(object) {
                const typePairs = [["Assets / Command Vehicle / ", "string"], [" / Condition Meter", undefined]];
                let position = 0;
                for (const [index, typePair] of typePairs.entries()) {
                    const [currentText, currentType] = typePair;
                    const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                    if (object.substr(position, currentText.length) !== currentText)
                        return {};
                    position += currentText.length;
                    if (nextText === "" && nextType !== undefined) {
                        const char = object.charAt(position);
                        if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                            return {};
                    }
                    const nextTextOrType = nextText === "" ? nextType : nextText;
                    const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                    if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                        return {};
                    position += resolvedPlaceholder.length;
                }
                return null;
            } function _6(object) {
                const typePairs = [["Assets / Companion / ", "string"], [" / Condition Meter", undefined]];
                let position = 0;
                for (const [index, typePair] of typePairs.entries()) {
                    const [currentText, currentType] = typePair;
                    const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                    if (object.substr(position, currentText.length) !== currentText)
                        return {};
                    position += currentText.length;
                    if (nextText === "" && nextType !== undefined) {
                        const char = object.charAt(position);
                        if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                            return {};
                    }
                    const nextTextOrType = nextText === "" ? nextType : nextText;
                    const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                    if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                        return {};
                    position += resolvedPlaceholder.length;
                }
                return null;
            } function _7(object) {
                const typePairs = [["Assets / Deed / ", "string"], [" / Condition Meter", undefined]];
                let position = 0;
                for (const [index, typePair] of typePairs.entries()) {
                    const [currentText, currentType] = typePair;
                    const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                    if (object.substr(position, currentText.length) !== currentText)
                        return {};
                    position += currentText.length;
                    if (nextText === "" && nextType !== undefined) {
                        const char = object.charAt(position);
                        if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                            return {};
                    }
                    const nextTextOrType = nextText === "" ? nextType : nextText;
                    const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                    if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                        return {};
                    position += resolvedPlaceholder.length;
                }
                return null;
            } function _8(object) {
                const typePairs = [["Assets / Module / ", "string"], [" / Condition Meter", undefined]];
                let position = 0;
                for (const [index, typePair] of typePairs.entries()) {
                    const [currentText, currentType] = typePair;
                    const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                    if (object.substr(position, currentText.length) !== currentText)
                        return {};
                    position += currentText.length;
                    if (nextText === "" && nextType !== undefined) {
                        const char = object.charAt(position);
                        if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                            return {};
                    }
                    const nextTextOrType = nextText === "" ? nextType : nextText;
                    const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                    if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                        return {};
                    position += resolvedPlaceholder.length;
                }
                return null;
            } function _9(object) {
                const typePairs = [["Assets / Path / ", "string"], [" / Condition Meter", undefined]];
                let position = 0;
                for (const [index, typePair] of typePairs.entries()) {
                    const [currentText, currentType] = typePair;
                    const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                    if (object.substr(position, currentText.length) !== currentText)
                        return {};
                    position += currentText.length;
                    if (nextText === "" && nextType !== undefined) {
                        const char = object.charAt(position);
                        if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                            return {};
                    }
                    const nextTextOrType = nextText === "" ? nextType : nextText;
                    const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                    if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                        return {};
                    position += resolvedPlaceholder.length;
                }
                return null;
            } function _10(object) {
                const typePairs = [["Assets / Support Vehicle / ", "string"], [" / Condition Meter", undefined]];
                let position = 0;
                for (const [index, typePair] of typePairs.entries()) {
                    const [currentText, currentType] = typePair;
                    const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                    if (object.substr(position, currentText.length) !== currentText)
                        return {};
                    position += currentText.length;
                    if (nextText === "" && nextType !== undefined) {
                        const char = object.charAt(position);
                        if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                            return {};
                    }
                    const nextTextOrType = nextText === "" ? nextType : nextText;
                    const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                    if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                        return {};
                    position += resolvedPlaceholder.length;
                }
                return null;
            } function _11(object) { ; if (object !== "Asset Condition Meter")
                return {};
            else
                return null; } function _12(object) { ; if (object !== "Health")
                return {};
            else
                return null; } function _13(object) { ; if (object !== "Spirit")
                return {};
            else
                return null; } function _14(object) { ; if (object !== "Supply")
                return {};
            else
                return null; } function su__5__6__7__8__9__10__11__12__13__14_eu(object) { var conditions = [_5, _6, _7, _8, _9, _10, _11, _12, _13, _14]; for (const condition of conditions) {
                var error = condition(object);
                if (!error)
                    return null;
            } return {}; } function _0(object) { ; if (typeof object !== "object" || object === null || Array.isArray(object))
                return {}; {
                if ("$id" in object) {
                    var error = su__undefined__string_eu(object["$id"]);
                    if (error)
                        return error;
                }
            } {
                if ("Name" in object) {
                    var error = _string(object["Name"]);
                    if (error)
                        return error;
                }
                else
                    return {};
            } {
                if ("Condition Meter" in object) {
                    var error = su__5__6__7__8__9__10__11__12__13__14_eu(object["Condition Meter"]);
                    if (error)
                        return error;
                }
                else
                    return {};
            } return null; } return _0(object); })) {
                option = new SelectInputMeterOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
            }
            else if (is(optionJson, object => { function _undefined(object) { ; if (object !== undefined)
                return {};
            else
                return null; } function _string(object) { ; if (typeof object !== "string")
                return {};
            else
                return null; } function _null(object) { ; if (object !== null)
                return {};
            else
                return null; } function su__undefined__string_eu(object) { var conditions = [_undefined, _string]; for (const condition of conditions) {
                var error = condition(object);
                if (!error)
                    return null;
            } return {}; } function _0(object) { ; if (typeof object !== "object" || object === null || Array.isArray(object))
                return {}; {
                if ("$id" in object) {
                    var error = su__undefined__string_eu(object["$id"]);
                    if (error)
                        return error;
                }
            } {
                if ("Name" in object) {
                    var error = _string(object["Name"]);
                    if (error)
                        return error;
                }
                else
                    return {};
            } {
                if ("Value" in object) {
                    var error = _string(object["Value"]);
                    if (error)
                        return error;
                }
                else
                    return {};
            } return null; } return _0(object); })) {
                option = new SelectInputCustomOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
            }
            else {
                throw new Error("Unable to construct select input options - check the data!");
            }
            return option;
        });
        this.Adjustable = json.Adjustable ?? false;
    }
}
export class AssetSelectInputStatOption {
    constructor(json, id) {
        this.$id = id;
        Object.assign(this, json);
    }
}
export class SelectInputMeterOption {
    constructor(json, id) {
        this.$id = id;
        Object.assign(this, json);
    }
}
class SelectInputCustomOption {
    constructor(json, id) {
        this.$id = id;
        Object.assign(this, json);
    }
}
//# sourceMappingURL=Input.js.map