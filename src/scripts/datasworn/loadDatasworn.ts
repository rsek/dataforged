import FastGlob from 'fast-glob'
import { ROOT_OUTPUT } from '../const.js'

import fs from 'fs-extra'
import path from 'path'
import { type Datasworn } from '../../types/io/datasworn.js'
import { type Simplify } from 'type-fest'

type CollectionKey = Exclude<keyof Datasworn, 'id' | 'source'>

export async function loadDataswornNamespace(namespace: string) {
	const jsonFiles = await FastGlob(`${ROOT_OUTPUT}/${namespace}/*.json`)
	const data: Array<Promise<Datasworn>> = []

	for (const file of jsonFiles)
		data.push(fs.readJSON(file) as Promise<Datasworn>)

	return await Promise.all(data)
}

export async function loadDataswornCollection<T extends CollectionKey>(
	namespace: string,
	type: T
) {
	const data = (await fs.readJSON(
		path.join(ROOT_OUTPUT, namespace, `${type}.json`)
	)) as Simplify<Pick<Required<Datasworn>, T>>

	return data
}
