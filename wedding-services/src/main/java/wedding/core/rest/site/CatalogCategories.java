package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import wedding.core.utils.WeddingResourceUtil;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toMap;

@Component(immediate = true)
@Service(CatalogCategories.class)
public class CatalogCategories implements RestFieldCore {

    @Override
    public Map<String, String> apply(SlingHttpServletRequest request) {
        return Optional.of(request.getResourceResolver())
                .map(resolver -> resolver.getResource(getSuffixPathFromRequest(request)))
                .map(Resource::listChildren)
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .collect(toMap(
                        Resource::getName,
                        r -> WeddingResourceUtil.getStringPropertyFromResource(r, RestFieldCore.PROPERTY_CATALOG_TITLE)));
    }


}
