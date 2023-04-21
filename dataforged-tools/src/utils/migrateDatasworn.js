import { readFileSync, writeFileSync } from 'fs'
import * as yaml from 'js-yaml'
import * as _ from 'lodash-es'

const rawData = readFileSync('./src/data/ironsworn/ironsworn_moves.json', 'utf-8')
const json = JSON.parse(rawData)

export function migrateDatasworn () {
  const moveData = json

  moveData.Moves = moveData.Categories.map(moveCat => {
    return moveCat.Moves.map(moveData => {
      if (moveData.Stats) {
        moveData.Trigger = {
          Text: '',
          Options: moveData.Stats.map(stat => {
            const option = {
              Text: '',
              'Action roll': { Stat: _.startCase(stat) }
            }
            return option
          })
        }
      }
      delete moveData.Stats
      const newMove = {
        Name: moveData.Name,
        Category: moveCat.Name,
        Trigger: moveData.Trigger ?? undefined
      }
      Object.assign(newMove, moveData)
      return newMove
    })
  }).flat(1)

  delete moveData.Categories
  const yamlData = yaml.dump(moveData, {
    lineWidth: -1,
    quotingType: '"'
  })
  writeFileSync('./src/data/ironsworn/ironsworn_moves.yaml', yamlData)
}

migrateDatasworn()
