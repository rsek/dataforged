import type { YamlSource, YamlTitle } from '@schema'
import type { OmitDeep, PartialDeepBy } from '@utils'

/**
 * @public
 */
export type MetadataKey = '$id' | 'Title' | 'Asset Type' | 'Display' | 'Source' | 'Tags' | 'Usage' | 'Aliases'

/**
 * A stub that omits common metadata recursively. Use it to create things like e.g. AssetAlterProperties.
 *
 * Additional keys to omit (non-recursively) may optionally be provided with K.
 * @public
 */
export type OmitMetadataDeep<T, K extends string =''> = OmitDeep<Omit<T, K>, MetadataKey>
/**
 * A stub that with recursively optional metadata. Additional keys to make partial may optionally be provided with K.
 * @public
 */
export type PartialMetadataDeep<T, K extends string=''> = PartialDeepBy<T, K | MetadataKey>

/**
 * A stub where keys {@link MetadataKey} and PartialKey (*and* their properties) are recursively nullable, OmitKey and `Ancestors` is omitted, and an `_idFragment` is optional.
 * @internal
 */
export type YamlStub<T, PartialKey extends string = '', OmitKey extends string = ''> = PartialMetadataDeep<Omit<T, OmitKey|'Source'>, PartialKey> & { _idFragment?: string | undefined, Source?: YamlSource | undefined, $id?: string | undefined }

/**
 * As {@link YamlStub} except it requires a `Title` key. Used for primary, fairly self-contained "nodes", like assets, moves, oracles, etc.
 * @internal
 */
export type YamlStubNode<T, PartialKey extends string='', OmitKey extends string=''> = YamlStub<T, PartialKey, OmitKey|'Title'> & { Title: YamlTitle }
