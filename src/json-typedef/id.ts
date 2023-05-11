import { toJtdString } from 'json-typedef/utils'
import { mapValues } from 'lodash'
import * as Schema from 'schema/common/id'

const ID = mapValues(Schema, (v, k) => toJtdString(v))

export default ID
