import type { Title, TitleCaseTitle, YamlStub } from '@schema'

/**
 * @internal
 */
export interface YamlTitle extends YamlStub<Title, 'Short'|'Standard', '$id'> { }

/**
 * @internal
 */
export interface YamlTitleCaseTitle extends YamlStub<TitleCaseTitle, 'Short'|'Standard', '$id'> { }
