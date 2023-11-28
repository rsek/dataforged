import { Type } from '@sinclair/typebox'

export const Tag = Type.Object({
	type: Type.String()
})

// a tag object would need to include the following:
// * type of object it points to, if any
// * an identifier for the tag -- this should be namespace specific, e.g. `sundered_isles.curse_oracle`

// could this replace the "suggestions" object?
