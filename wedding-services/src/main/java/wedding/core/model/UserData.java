package wedding.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import wedding.core.utils.WeddingResourceUtil;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class UserData {

    @Self
    @JsonIgnore
    private Resource resource;

    @Inject
    private String userID;
    @Inject
    private String authType;
    @Inject
    private String type;
    @Inject
    private String firstName;
    @Inject
    private String lastName;
    @Inject
    private String city;
    @Inject
    private String name;
    @Inject
    private String phone;
    @Inject
    private String speciality;
    @Inject
    private String description;

    @Inject
    private String priceStart;
    @Inject
    private String priceEnd;

    @Inject
    private String email;
    @Inject
    private String siteLink;
    @Inject
    private String vkLink;
    @Inject
    private String facebookLink;
    @Inject
    private String instagramLink;

    private String avatarPath;
    private List<String> portfolioPaths;

    @PostConstruct
    public void init() {
        Optional.ofNullable(resource.getChild("avatar/file"))
                .map(Resource::getPath)
                .ifPresent(this::setAvatarPath);
        portfolioPaths = Optional.ofNullable(resource.getChild("portfolio"))
                .map(Resource::listChildren)
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(Resource::getPath)
                .collect(Collectors.toList());
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getAuthType() {
        return authType;
    }

    public void setAuthType(String authType) {
        this.authType = authType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public String getPriceStart() {
        return priceStart;
    }

    public void setPriceStart(String priceStart) {
        this.priceStart = priceStart;
    }

    public String getPriceEnd() {
        return priceEnd;
    }

    public void setPriceEnd(String priceEnd) {
        this.priceEnd = priceEnd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSiteLink() {
        return siteLink;
    }

    public void setSiteLink(String siteLink) {
        this.siteLink = siteLink;
    }

    public String getVkLink() {
        return vkLink;
    }

    public void setVkLink(String vkLink) {
        this.vkLink = vkLink;
    }

    public String getFacebookLink() {
        return facebookLink;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getInstagramLink() {
        return instagramLink;
    }

    public void setInstagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public String getAvatarPath() {
        return avatarPath;
    }

    public void setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath;
    }

    public List<String> getPortfolioPaths() {
        return portfolioPaths;
    }

    public void setPortfolioPaths(List<String> portfolioPaths) {
        this.portfolioPaths = portfolioPaths;
    }
}
