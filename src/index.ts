
import buildDataforged from "./utilities/buildDataforged";
import buildDataforgedLegacy from "./utilities/buildDataforgedLegacy";

let data = buildDataforged("./next/");
buildDataforgedLegacy("./legacy/", data);