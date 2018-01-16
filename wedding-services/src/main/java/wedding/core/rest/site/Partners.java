package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import wedding.core.model.UserData;
import wedding.core.utils.WeddingResourceUtil;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true)
@Service(Partners.class)
public class Partners implements RestFieldCore {

    @Override
    public Object apply(SlingHttpServletRequest request) {
        String city = request.getParameter(REQUEST_PARAMETER_CITY);
        return Optional.ofNullable(request.getParameter(REQUEST_PARAMETER_CATEGORY_PATH))
                .map(path -> request.getResourceResolver().getResource(path))
                .map(categoryResource -> categoryResource.getChild(city))
                .map(Resource::listChildren)
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(UserData.class))
                .collect(Collectors.toList());
    }


}
