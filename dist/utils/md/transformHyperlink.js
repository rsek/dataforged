import { findById } from "../../../dist/utils/md/findById.js";
import _ from "lodash-es";
export function transformMoveLinks(md, localLinks = false, pathPrefix = "") {
    md = md.replaceAll(/\(Moves\/([^ ]+?)\/([^ ]+?)\)/g, (match, p1, p2) => {
        let result = match;
        if (localLinks) {
            result = `(#${p2})`;
        }
        else {
            result = `(${pathPrefix}moves.md#${p2})`;
        }
        return result.replaceAll("_", "-");
    });
    return md;
}
export function transformOracleLinks(data, md, currentFile) {
    md = md.replaceAll(/\(Oracles\/([^ ]+?)\/([^ ]+?)\)/g, (match, p1, p2) => {
        const oracleId = match.replaceAll("/", " / ").replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll("_", " ");
        const linkedOracle = findById(data, oracleId);
        if (!linkedOracle) {
            throw new Error(`Unable to find linked oracle: ${oracleId}`);
        }
        let targetFile = `${_.kebabCase(p1)}.md`;
        if (currentFile === targetFile || currentFile === "oracles.md") {
            targetFile = "";
        }
        const result = `(${targetFile}#${linkedOracle.Display.Title.replaceAll(" ", "-")})`;
        return result.replaceAll("_", "-");
    });
    md = md.replaceAll(/\(Oracles\/([^ ]+?)\)/g, (match, p1) => {
        const oracleId = match.replaceAll("/", " / ").replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll("_", " ");
        const linkedOracle = findById(data, oracleId);
        if (!linkedOracle) {
            throw new Error(`Unable to find linked oracle: ${oracleId}`);
        }
        let targetFile = "";
        if (currentFile === "oracles.md") {
            targetFile = `#${linkedOracle.Display.Title}`.replace(" ", "-");
        }
        else {
            targetFile = `${_.kebabCase(p1)}.md`;
        }
        const result = `(${targetFile})`.replaceAll("_", "-");
        return result;
    });
    return md;
}
//# sourceMappingURL=transformHyperlink.js.map