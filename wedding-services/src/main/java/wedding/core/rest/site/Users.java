package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.model.ClientModel;
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
                .map(resource -> resource.adaptTo(ClientModel.class))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public Object updateObject(SlingHttpServletRequest request) {
        ClientModel clientModel = request.adaptTo(ClientModel.class);
        Optional.ofNullable(clientModel)
                .ifPresent(SlingModelUtil::updateModel);
        return clientModel;
    }
}
