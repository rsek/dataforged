"use strict";
/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLog = void 0;
/**
 * Logs a standardized build message to console.
 * @param fn - the function to tag the message with
 */
function buildLog(fn, message) {
    const parentIdentifier = fn.name;
    const msg = `[${parentIdentifier}] ${message}`;
    // eslint-disable-next-line no-console
    console.info(msg);
}
exports.buildLog = buildLog;
//# sourceMappingURL=buildLog.js.map