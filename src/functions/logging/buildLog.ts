/* eslint-disable @typescript-eslint/ban-types */
interface IMayHaveId extends Function {
  $id?: string;
}

export default function buildLog(fn: Function, message: string): void {
  const parentIdentifier = fn.name;
  const msg = `[${parentIdentifier}] ${message}`;
  console.info(msg);
}