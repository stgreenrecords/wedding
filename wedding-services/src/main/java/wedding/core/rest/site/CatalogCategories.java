package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import wedding.core.data.Constants;
import wedding.core.utils.WeddingResourceUtil;

import java.util.*;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toMap;

@Component(immediate = true)
@Service(CatalogCategories.class)
public class CatalogCategories implements RestFieldCore {

    @Override
    public Map<String, String> apply(SlingHttpServletRequest request, Map<String, String> query) {
        return Optional.ofNullable(request.getResourceResolver().getResource(Constants.CATALOG_ROOT_PAGE_PATH))
                .map(Resource::listChildren)
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .collect(toMap(
                        Resource::getPath,
                        r -> WeddingResourceUtil.getStringPropertyFromResource(r, RestFieldCore.PROPERTY_CATALOG_TITLE)));
    }


}
