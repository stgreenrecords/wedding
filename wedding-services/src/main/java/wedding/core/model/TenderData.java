package wedding.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import wedding.core.services.binary.impl.Type;
import wedding.core.utils.WeddingResourceUtil;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TenderData {

    /*                “tenderId”:”sometenderId”,
”photoUrl”:”/content/photo.jpg”,
”firstName”:”Vasya”,
”secondName”:”Xryshkin”,
”datePublication”:”27-12-1999”,
“deadline”:”28-12-2012”,
“shortText”:”Description”,
” required”:[”Видеографы”, “Фотографы”],
”offers”:”12”,
“city”:”Minsk”,
“moneyLimit”:”100”},
            {…next tender…}]}*/

    @Self
    @JsonIgnore
    private Resource resource;

    @Inject
    private String tenderId;
    @Inject
    private Calendar datePublication;
    @Inject
    private Calendar deadline;
    @Inject
    private String shortText;
    @Inject
    private String[] required;
    @Inject
    private String offers;
    @Inject
    private String moneyLimit;

    @PostConstruct
    public void init() {
    }

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
