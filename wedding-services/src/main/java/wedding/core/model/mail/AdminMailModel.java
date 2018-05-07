package wedding.core.model.mail;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AdminMailModel {

    @Self
    private Resource resource;

    @ChildResource
    private List<BaseMailModel> mails;

    public List<BaseMailModel> getMails() {
        return mails;
    }

    public void setMails(List<BaseMailModel> mails) {
        this.mails = mails;
    }
}

