import { Kind } from '@sinclair/typebox'
import * as ID from '../../schema/datasworn/common/Id.js'
import { mapValues } from 'lodash-es'

const objectIdPatterns = new Map<string, RegExp>()

for (const [k, v] of Object.entries(ID)) {
	if (typeof v.pattern !== 'string') continue

	objectIdPatterns.set(k, new RegExp(v.pattern))
}

function isDataswornID(str: string) {
	for (const [k, p] of objectIdPatterns) {
		if (str.match(p)) return true
	}

	return false
}

function parseID(str: string) {}
