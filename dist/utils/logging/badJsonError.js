export function badJsonError(source, obj, message = "JSON does not conform to interface") {
    let srcId;
    if (source.name) {
        srcId = source.name;
    }
    else {
        srcId = source.toString();
    }
    let msg = `[${srcId}] ${message}`;
    if (obj) {
        msg += `: ${JSON.stringify(obj, null, 2)}`;
    }
    return new Error(msg);
}
//# sourceMappingURL=badJsonError.js.map