package wedding.core.rest.site;

import org.apache.sling.api.SlingHttpServletRequest;

public interface RestFieldCore {

    String PROPERTY_CATALOG_TITLE = "catalogTitle";

    Object apply(SlingHttpServletRequest request);

}
