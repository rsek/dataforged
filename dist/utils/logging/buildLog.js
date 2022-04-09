export function buildLog(fn, message) {
    const parentIdentifier = fn.name;
    const msg = `[${parentIdentifier}] ${message}`;
    console.info(msg);
}
//# sourceMappingURL=buildLog.js.map