import type { IInput, IInputClock, IInputNumber, IInputText, InputType } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";

export type IInputYaml<T extends InputType> = StubBy<IInput<T>, never, "$id">;

export interface IInputClockYaml extends StubBy<IInputClock, never, "$id"> {}

export interface IInputTextYaml extends StubBy<IInputText, never, "$id"> {}

export interface IInputNumberYaml extends StubBy<IInputNumber, never, "$id"> {}
