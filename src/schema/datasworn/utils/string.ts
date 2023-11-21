import { camelCase } from 'lodash-es'

export function capitalize(str: string) {
	return str[0].toLocaleLowerCase('en') + str.slice(1)
}

export function pascalCase(str: string) {
	return capitalize(camelCase(str))
}
