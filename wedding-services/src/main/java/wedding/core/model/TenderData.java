package wedding.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Calendar;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TenderData {

    @Self
    @JsonIgnore
    private Resource resource;

    @ValueMapValue
    private String tenderId;
    @ValueMapValue
    private Calendar datePublication;
    @ValueMapValue
    private Calendar deadline;
    @ValueMapValue
    private String shortText;
    @ValueMapValue
    private String[] required;
    @ValueMapValue
    private String offers;
    @ValueMapValue
    private String moneyLimit;

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public String getTenderId() {
        return tenderId;
    }

    public void setTenderId(String tenderId) {
        this.tenderId = tenderId;
    }

    public Calendar getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(Calendar datePublication) {
        this.datePublication = datePublication;
    }

    public Calendar getDeadline() {
        return deadline;
    }

    public void setDeadline(Calendar deadline) {
        this.deadline = deadline;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String[] getRequired() {
        return required;
    }

    public void setRequired(String[] required) {
        this.required = required;
    }

    public String getOffers() {
        return offers;
    }

    public void setOffers(String offers) {
        this.offers = offers;
    }

    public String getMoneyLimit() {
        return moneyLimit;
    }

    public void setMoneyLimit(String moneyLimit) {
        this.moneyLimit = moneyLimit;
    }
}