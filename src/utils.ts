export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<RecursivePartial<U>>
		: T[P] extends number | string | symbol | undefined
		? T[P]
		: RecursivePartial<T[P]>
}
