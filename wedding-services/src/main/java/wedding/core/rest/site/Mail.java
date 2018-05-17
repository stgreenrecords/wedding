package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.model.mail.BaseMailModel;

@Component(immediate = true)
@Service(Mail.class)
public class Mail extends AbstractResFieldCore {

    @Override
    public Object createObject(SlingHttpServletRequest request) {
        return createOrUpdateModel(request, BaseMailModel.class);
    }

    @Override
    public Object updateObject(SlingHttpServletRequest request) {
        return createOrUpdateModel(request, BaseMailModel.class);
    }
}
