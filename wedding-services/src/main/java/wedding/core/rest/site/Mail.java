package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.PersistenceException;
import wedding.core.model.ClientModel;
import wedding.core.model.mail.BaseMailModel;
import wedding.core.utils.SlingModelUtil;

import java.util.Optional;

@Component(immediate = true)
@Service(Mail.class)
public class Mail extends AbstractResFieldCore {

    @Override
    public Object createObject(SlingHttpServletRequest request) {
        return createModel(request, BaseMailModel.class);
    }

}
