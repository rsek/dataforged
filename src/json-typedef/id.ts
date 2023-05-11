import { toJtdId } from 'json-typedef/utils'
import { mapValues } from 'lodash'
import * as Schema from 'schema/common/id'

const ID = mapValues(Schema, (v, k) => toJtdId(v))

export default ID
