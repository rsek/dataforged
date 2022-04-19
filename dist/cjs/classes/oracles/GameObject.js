"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = void 0;
const index_js_1 = require("../index.js");
const index_js_2 = require("../../game_objects/index.js");
const badJsonError_js_1 = require("../../utils/logging/badJsonError.js");
const enumHas_js_1 = require("../../utils/validation/enumHas.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class GameObject {
    constructor(json) {
        if (!((0, enumHas_js_1.enumHas)(index_js_2.ActorType, json["Object type"]) || (0, enumHas_js_1.enumHas)(index_js_2.PlaceType, json["Object type"]))) {
            throw (0, badJsonError_js_1.badJsonError)(this.constructor, json, "Invalid object type");
        }
        this["Object type"] = json["Object type"];
        // this["Inherit rolls"] = json["Inherit rolls"] ?? false;
        const requiredAttributes = lodash_es_1.default.omit(json, ["Object type", "Inherit rolls"]);
        if (Object.keys(requiredAttributes).length) {
            const requirements = { Attributes: requiredAttributes };
            this.Requires = new index_js_1.Requirements(requirements);
        }
    }
}
exports.GameObject = GameObject;
//# sourceMappingURL=GameObject.js.map