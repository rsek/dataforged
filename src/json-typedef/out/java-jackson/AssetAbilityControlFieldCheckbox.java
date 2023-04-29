// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Dataforged;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class AssetAbilityControlFieldCheckbox extends AssetAbilityControlField {
    @JsonProperty("id")
    private AssetControlFieldId id;

    @JsonProperty("label")
    private Label label;

    @JsonProperty("value")
    private Boolean value;

    public AssetAbilityControlFieldCheckbox() {
    }

    /**
     * Getter for id.<p>
     */
    public AssetControlFieldId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     */
    public void setId(AssetControlFieldId id) {
        this.id = id;
    }

    /**
     * Getter for label.<p>
     */
    public Label getLabel() {
        return label;
    }

    /**
     * Setter for label.<p>
     */
    public void setLabel(Label label) {
        this.label = label;
    }

    /**
     * Getter for value.<p>
     */
    public Boolean getValue() {
        return value;
    }

    /**
     * Setter for value.<p>
     */
    public void setValue(Boolean value) {
        this.value = value;
    }
}
