import type { IInput, IInputClock, IInputNumber, IInputText } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";

export type IInputYaml= StubBy<IInput, never, "$id">;

export interface IInputClockYaml extends StubBy<IInputClock, never, "$id"> {}

export interface IInputTextYaml extends StubBy<IInputText, never, "$id"> {}

export interface IInputNumberYaml extends StubBy<IInputNumber, never, "$id"> {}
