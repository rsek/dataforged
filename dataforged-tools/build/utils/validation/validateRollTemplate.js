import { badJsonError } from "../logging/badJsonError.js";
import _ from "lodash-es";
import { TypedRegEx } from "typed-regex";
import { is } from "typescript-is";
// eslint-disable-next-line no-useless-escape
const rollTplPattern = TypedRegEx("\$\{\{(?<id>.*?)\}\}", "g");
/**
 * It validates that the RollTemplate object has the same keys as the parent object, and validates each individual roll template string.
 * @param parent - The parent object that the template is being validated against.
 * @param templateObj - RollTemplate<T>
 * @returns The original object as the validated type.
 */
export function validateRollTemplate(parent, templateObj) {
    // FIXME: smarted subtable template handling.
    _.forEach(templateObj, (rollTplData, key) => {
        if (!parent[key]) {
            // console.info(parent);
            throw badJsonError(validateRollTemplate, templateObj, `RollTemplate key '${key}' doesn't exist on its parent object. This is necessary so that a placeholder string is provided.`);
        }
        if (rollTplData) {
            // console.log("validating template data", rollTplData);
            _.forEach(rollTplData, (v, k) => {
                // console.log("validating string", v);
                validateRollTemplateString(v);
            });
        }
    });
    return templateObj;
}
/**
 * It takes a string and returns true if it's a valid roll template string
 * @param str - The string to validate.
 * @returns A boolean indicating whether the string is valid.
 */
export function validateRollTemplateString(str) {
    if (typeof str !== "string") {
        throw badJsonError(validateRollTemplateString, str, "Expected a string");
    }
    const captures = _.compact(rollTplPattern.captureAll(str).map(capture => capture === null || capture === void 0 ? void 0 : capture.id));
    captures.forEach(capture => {
        if (!is(capture, object => { function _1(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/Access/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _2(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/Community/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _3(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/Engineering/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _4(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/Living/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _5(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/Medical/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/Operations/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/Production/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/Research/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/Chaotic/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/Fortified/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _11(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/Haunted/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _12(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/Infested/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _13(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/Inhabited/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _14(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/Mechanical/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _15(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/Ruined/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _16(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/Sacred/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _17(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Desert/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _18(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Furnace/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _19(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Grave/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _20(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Ice/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _21(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Jovian/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _22(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Jungle/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _23(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Ocean/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _24(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Rocky/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _25(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Shattered/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _26(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Tainted/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _27(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/Vital/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _28(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Vaults/Interior/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _29(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Vaults/Sanctum/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _30(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/Access/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _31(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/Community/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _32(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/Engineering/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _33(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/Living/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _34(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/Medical/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _35(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/Operations/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _36(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/Production/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _37(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/Research/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _38(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/Chaotic/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _39(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/Fortified/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _40(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/Haunted/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _41(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/Infested/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _42(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/Inhabited/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _43(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/Mechanical/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _44(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/Ruined/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _45(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/Sacred/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _46(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Desert/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _47(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Furnace/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _48(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Grave/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _49(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Ice/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _50(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Jovian/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _51(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Jungle/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _52(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Ocean/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _53(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Rocky/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _54(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Shattered/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _55(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Tainted/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _56(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/Vital/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _57(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Vaults/Interior/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _58(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Vaults/Sanctum/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _59(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Character_Creation/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _60(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Characters/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _61(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Core/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _62(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Creatures/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _63(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Factions/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _64(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Misc/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _65(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Moves/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _66(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Space/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _67(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Starships/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _68(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Character_Creation/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _69(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Characters/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _70(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Core/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _71(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Creatures/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _72(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Factions/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _73(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Misc/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _74(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Moves/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _75(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Space/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _76(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Starships/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _77(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Derelicts/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _78(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Location_Themes/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _79(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Planets/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _80(object) {
            var _a;
            const typePairs = [["Starforged/Oracles/Vaults/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _81(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Derelicts/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _82(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Location_Themes/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _83(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Planets/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _84(object) {
            var _a;
            const typePairs = [["Ironsworn/Oracles/Vaults/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function su__1__2__3__4__5__6__7__8__9__10__11__12__13__14__15__16__17__18__19__20__21__22__23__24__25__26__27__28__29__30__31__32__33__34__35__36__37__38__39__40__41__42__43__44__45__46__47__48__49__50__51__52__53__54__55__56__57__58__59__60__61__62__63__64__65__66__67__68__69__70__71__72__73__74__75__76__77__78__79__80__81__82__83__84_eu(object) { var conditions = [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84]; for (const condition of conditions) {
            var error = condition(object);
            if (!error)
                return null;
        } return {}; } return su__1__2__3__4__5__6__7__8__9__10__11__12__13__14__15__16__17__18__19__20__21__22__23__24__25__26__27__28__29__30__31__32__33__34__35__36__37__38__39__40__41__42__43__44__45__46__47__48__49__50__51__52__53__54__55__56__57__58__59__60__61__62__63__64__65__66__67__68__69__70__71__72__73__74__75__76__77__78__79__80__81__82__83__84_eu(object); })) {
            throw badJsonError(validateRollTemplateString, capture, "Doesn't appear to be a valid OracleTableId");
        }
    });
    return str;
}
//# sourceMappingURL=validateRollTemplate.js.map