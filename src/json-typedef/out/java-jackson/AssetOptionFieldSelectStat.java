// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Dataforged;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.Map;

@JsonSerialize
public class AssetOptionFieldSelectStat extends AssetOptionField {
    @JsonProperty("choices")
    private Map<String, AssetOptionFieldSelectStatChoice> choices;

    @JsonProperty("id")
    private AssetOptionFieldId id;

    @JsonProperty("label")
    private Label label;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("value")
    private PlayerStat value;

    public AssetOptionFieldSelectStat() {
    }

    /**
     * Getter for choices.<p>
     */
    public Map<String, AssetOptionFieldSelectStatChoice> getChoices() {
        return choices;
    }

    /**
     * Setter for choices.<p>
     */
    public void setChoices(Map<String, AssetOptionFieldSelectStatChoice> choices) {
        this.choices = choices;
    }

    /**
     * Getter for id.<p>
     */
    public AssetOptionFieldId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     */
    public void setId(AssetOptionFieldId id) {
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
    public PlayerStat getValue() {
        return value;
    }

    /**
     * Setter for value.<p>
     */
    public void setValue(PlayerStat value) {
        this.value = value;
    }
}