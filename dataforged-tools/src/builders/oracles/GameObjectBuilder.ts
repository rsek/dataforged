import type { GameObjectRecord } from '@game_objects'
import type { GameObjectType } from '@game_objects/enum/GameObjectType.js'
import type { GameObject, Requirements, YamlRequirements } from '@schema'
import type { AttributeMap } from '@utils/types/AttributeHash.js'
import _ from 'lodash-es'

/**
 * @internal
 */
export class GameObjectBuilder implements GameObject {
  object_type: GameObjectType
  requires?: AttributeMap | undefined
  inherit_rolls?: boolean | undefined
  constructor(yaml: GameObjectRecord) {
    this.object_type = yaml.object_type
    const requiredAttributes = _.omit(yaml, ['object_type', 'inherit_rolls']) as AttributeMap
    if (Object.keys(requiredAttributes).length > 0) {
      this.requires = requiredAttributes
    }
  }
}
