// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Dataforged;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "field_type")
@JsonSubTypes({
    @JsonSubTypes.Type(name = "select_asset_extension", value = AssetAbilityOptionFieldSelectAssetExtension.class),
    @JsonSubTypes.Type(name = "select_number", value = AssetAbilityOptionFieldSelectNumber.class),
    @JsonSubTypes.Type(name = "select_stat", value = AssetAbilityOptionFieldSelectStat.class),
    @JsonSubTypes.Type(name = "text", value = AssetAbilityOptionFieldText.class),
})
public abstract class AssetAbilityOptionField {
}