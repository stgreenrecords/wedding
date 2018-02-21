package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;

@Component(immediate = true)
@Service(Users.class)
public class Users implements RestFieldCore {

    @Override
    public Object apply(SlingHttpServletRequest request) {
        return null;
    }
}
