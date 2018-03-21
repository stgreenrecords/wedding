package wedding.core.rest.site;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.model.UserData;
import wedding.core.utils.WeddingResourceUtil;

import javax.jcr.query.Query;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true)
@Service(Users.class)
public class Users extends AbstractResFieldCore {

    @Override
    public Object getObject(SlingHttpServletRequest request) {
        String userId = Optional.ofNullable(request.getParameter(REQUEST_PARAMETER_USER_ID))
                .map(user -> String.format(PART_USER_QUERY, user))
                .orElse(StringUtils.EMPTY);
        return Optional.of(request.getResourceResolver())
                .map(resolver -> resolver.findResources(String.format(USER_QUERY, getSuffixPathFromRequest(request), userId), Query.SQL))
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(UserData.class))
                .collect(Collectors.toList());
    }

}
