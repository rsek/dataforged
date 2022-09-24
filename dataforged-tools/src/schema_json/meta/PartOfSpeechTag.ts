/**
 * @public
 */
export enum PartOfSpeechTag {
    Noun = "noun",
    CommonNoun = "common noun",
    Fragment = "fragment",
    Adjective = "adjective",
    ProperNoun = "proper noun",
    Verb = "verb",
    Plural = "plural",
    Name = "name",
    ProperNounFragment = "proper noun fragment",
    Sentences = "sentences",
    CompoundNoun = "compound noun",
    PossessiveCase = "possessive case"
}

// TODO: revise this to be more precise
// /**
//  * Enumerates parts of speech used by various localizable strings.
//  * @public
//  */
// export enum PartOfSpeechTag {
//   ProperNoun="proper noun",
//   Noun="noun",
//   Verb="verb",
//   /**
//    * The text is an adjective. Occasionally this will include an adverb or be a hyphenated compound, but it still functions as a single adjective.
//    * @example 'Augmented'
//    * @example 'Ill-equipped'
//    * @example 'Visibly disabled'
//    */
//   Adjective="adjective",
//   /**
//    * The text is a phrase or sentence fragment: it contains several words, but is not a complete grammatical sentence.
//    */
//   Phrase="phrase",
//   /**
//    * The text is one or more complete grammatical sentences.
//    */
//   Sentence="sentence",
// }

// /**
//  *
//  * @public
//  */
// export enum SubjectTag {
//   Peril="peril",
//   Opportunity="opportunity",
//   /**
//    * The text is a phrase or sentence that describes a person, place, or thing.
//    */
//   Description="",
//   /**
//    * The text describes an objective or goal belonging to a character or faction.
//    */
//   Objective="",
// }

// export enum TenseTag {}