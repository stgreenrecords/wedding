package wedding.core.rest.site;

import org.apache.sling.api.SlingHttpServletRequest;

import java.util.Map;

public interface RestFieldCore {

    String PROPERTY_CATALOG_TITLE = "jcr:title";

    Object apply(SlingHttpServletRequest request, Map<String, String> query);

}
