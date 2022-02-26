import t from 'ts-runtime/lib';
import IDisplay from '../../../general/Display';
import ISource from '../../../general/interfaces/ISource';
import MdString from '../../../general/MdString';
import OracleCategoryId from '../../OracleCategoryId';
import OracleTableId from '../../OracleTableId';
import IOracleContent from '../IOracleContent';
import IOracleUsageYaml from './IOracleUsageYaml';

export default interface IOracleYamlBase {
  $id?: OracleTableId | OracleCategoryId | undefined;
  Name: string;
  Aliases?: string[] | undefined;
  Category?: OracleCategoryId | undefined;
  "Member of"?: OracleTableId | undefined;
  Description?: MdString | undefined;
  Source?: ISource | undefined;
  Display?: IDisplay | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Content?: IOracleContent | undefined;
}

