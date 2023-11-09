// TODO

// export abstract class RegExpToken {
// 	static SEP = '/'

// 	isWildcard = false

// 	prefixSeparator = true

// 	toRegExp() {
// 		return new RegExp(`^${this.toString(false)}$`)
// 	}

// 	wildcard() {
// 		this.isWildcard = true
// 		return this
// 	}

// 	_toWildcardString(): string {
// 		return this._toString()
// 	}

// 	abstract _toString(): string

// 	toString(separatorBefore = this.prefixSeparator) {
// 		let result = this.isWildcard ? this._toWildcardString() : this._toString()

// 		if (separatorBefore) result = RegExpToken.SEP + result

// 		return result
// 	}
// }

// export class GroupToken extends RegExpToken {
// 	label?: string
// 	tokens: RegExpToken[]

// 	override toString() {
// 		const contents = this.tokens
// 			.map((token, i) => (i > 0 ? token.toString(false) : token.toString()))
// 			.join('')

// 		if (typeof this.label === 'string') return `(<${this.label}>${contents})`
// 		return `(${contents})`
// 	}

// 	constructor({ label, tokens }: { label?: string; tokens: RegExpToken[] }) {
// 		super()
// 		this.label = label
// 		this.tokens = tokens
// 	}
// }

// export class StaticToken extends RegExpToken {
// 	value: string

// 	constructor(value: string) {
// 		super()
// 		this.value = value
// 	}
// }

// export class NamespaceToken extends RegExpToken {}

// export class CollectionToken extends RegExpToken {}

// export class ID extends RegExp {
// 	/**
// 	 *
// 	 */
// 	constructor(...tokens: RegExpToken) {
// 		super()
// 	}
// }
