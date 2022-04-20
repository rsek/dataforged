/**
 * It creates an error message for when a value is not present in an enum.
 * @param source - The source of the error. This can be anything with a "toString" method, or an object with a `name` property.
 * @param badItem - the bad item that was passed in
 * @param e - EnumLike
 * @returns An Error.
 */
export function badEnumError(source, badItem, e) {
    let srcId;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof source.name !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        srcId = source.name;
    }
    else {
        srcId = source.toString();
    }
    const msg = `[${srcId}] "${badItem}" not present in ${JSON.stringify(e)}`;
    return new Error(msg);
}
