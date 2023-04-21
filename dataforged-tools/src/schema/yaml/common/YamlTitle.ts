import type { LocalizableKey, Title, TitleCaseTitle, YamlStub } from '@schema'

/**
 * @internal
 */
export interface YamlTitle extends YamlStub<Title, LocalizableKey.Short | LocalizableKey.Standard> { }

/**
 * @internal
 */
export interface YamlTitleCaseTitle extends YamlStub<TitleCaseTitle, LocalizableKey.Short | LocalizableKey.Standard> { }
