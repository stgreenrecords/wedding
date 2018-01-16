package wedding.core.rest.site;

import org.apache.sling.api.SlingHttpServletRequest;

import java.util.Map;

public interface RestFieldCore {

    String PROPERTY_CATALOG_TITLE = "jcr:title";

    String REQUEST_PARAMETER_CATEGORY_PATH = "categoryPath";
    String REQUEST_PARAMETER_CITY = "city";

    Object apply(SlingHttpServletRequest request);

}
