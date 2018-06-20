package wedding.core.model;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ClientModel extends BaseUserModel {

    @ChildResource
    private List<TenderModel> tenders;

    public List<TenderModel> getTenders() {
        return tenders;
    }

    public void setTenders(List<TenderModel> tenders) {
        this.tenders = tenders;
    }
}
