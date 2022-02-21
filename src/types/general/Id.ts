
import t from 'ts-runtime/lib';

export interface IWillHaveId {
  $id?: string;
  Name?: string;
}
export interface IHasId extends IWillHaveId {
  $id: string;
  Name: string;
}