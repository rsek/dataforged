import fs from "fs";
import { refsPath } from "./concatWithYamlRefs.js";

export default function buildTemplates(path: fs.PathLike = refsPath.toString() + "/templates/") {
  const files: fs.PathLike[] = fs.readdirSync(path).filter(item => item.match(".yaml"))
    .map(item => path.toString() + item);
  let templateString: string = files.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
  templateString = templateString.replaceAll(/^/gim, "  ");
  templateString = "_templates:\n" + templateString;
  return templateString;
}
