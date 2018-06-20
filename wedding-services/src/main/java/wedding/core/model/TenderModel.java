package wedding.core.model;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import wedding.core.services.binary.impl.Type;
import wedding.core.utils.SlingModelUtil;

import javax.annotation.PostConstruct;
import java.util.Calendar;
import java.util.Iterator;
import java.util.Optional;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TenderModel extends WeddingBaseModel {

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
    @ValueMapValue
    private String firstName;
    @ValueMapValue
    private String lastName;
    @ValueMapValue
    private String city;

    private String avatar;
    private String backGroundImage;

    @PostConstruct
    public void init() {
        Optional.ofNullable(getResource())
                .map(res -> res.getChild(Type.AVATAR.getRelPath()))
                .map(Resource::listChildren)
                .filter(Iterator::hasNext)
                .map(Iterator::next)
                .map(Resource::getPath)
                .ifPresent(this::setAvatar);
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getBackGroundImage() {
        return backGroundImage;
    }

    public void setBackGroundImage(String backGroundImage) {
        this.backGroundImage = backGroundImage;
    }
}
