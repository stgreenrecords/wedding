package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.model.UserData;
import wedding.core.utils.SlingModelUtil;
import wedding.core.utils.WeddingResourceUtil;

import javax.jcr.query.Query;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true)
@Service(Users.class)
public class Users extends AbstractResFieldCore {

    @Override
    public Object getObject(SlingHttpServletRequest request) {
        return Optional.of(request.getResourceResolver())
                .map(resolver -> resolver.findResources(String.format(USER_QUERY, WeddingResourceUtil.getSuffixPathFromRequest(request), WeddingResourceUtil.getIdQueryPart(request)), Query.SQL))
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(UserData.class))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public Object updateObject(SlingHttpServletRequest request) {
        UserData userData = request.adaptTo(UserData.class);
        Optional.ofNullable(userData)
                .ifPresent(SlingModelUtil::updateModel);
        return userData;
    }
}
