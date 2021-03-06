package wedding.core.model.mail;


import org.apache.jackrabbit.vault.util.JcrConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import wedding.core.model.WeddingBaseModel;

import javax.annotation.PostConstruct;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BaseMailModel extends WeddingBaseModel {

    @ValueMapValue(name = JcrConstants.JCR_TITLE)
    private String title;

    @ValueMapValue(name = JcrConstants.JCR_CREATED)
    private String date;

    @ValueMapValue
    private String text;

    @ValueMapValue
    private String subject;

    @ValueMapValue
    private String allUsers;

    @ValueMapValue
    private String allPartners;

    @ValueMapValue
    private String[] recipients;

    private String path;

    @PostConstruct
    public void init() {
        path = getResource().getPath();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String[] getRecipients() {
        return recipients;
    }

    public void setRecipients(String[] recipients) {
        this.recipients = recipients;
    }

    public String isAllUsers() {
        return allUsers;
    }

    public void setAllUsers(String allUsers) {
        this.allUsers = allUsers;
    }

    public String isAllPartners() {
        return allPartners;
    }

    public void setAllPartners(String allPartners) {
        this.allPartners = allPartners;
    }
}
