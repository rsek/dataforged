
import { readFileSync, writeFileSync } from 'fs'
import _ from 'lodash-es'
import yaml from 'js-yaml'

const moveData = JSON.parse(readFileSync('./src/data/moves.json'))
const outcomes = JSON.parse(readFileSync('./src/data/moveOutcomes-edit.json'))

moveData.Moves = moveData.Moves.map(move => {
  const outcome = outcomes[`Moves / ${move.Name}`]
  if (outcome) {
    move.Outcomes = {}
    _.forEach(outcome, (value, key) => {
      move.Outcomes[key] = {
        Text: value
      }
    })
  }
  return move
})

const yamlData = yaml.dump(moveData, {
  lineWidth: -1,
  quotingType: '"'
})
writeFileSync('./src/data/moves-with-outcomes.yaml', yamlData)
