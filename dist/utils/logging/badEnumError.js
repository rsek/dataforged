export function badEnumError(source, badItem, e) {
    let srcId;
    if (typeof source.name !== "undefined") {
        srcId = source.name;
    }
    else {
        srcId = source.toString();
    }
    const msg = `[${srcId}] "${badItem}" not present in ${JSON.stringify(e)}`;
    return new Error(msg);
}
//# sourceMappingURL=badEnumError.js.map