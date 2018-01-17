package wedding.core.rest.site;

import org.apache.sling.api.SlingHttpServletRequest;

import java.util.Map;

public interface RestFieldCore {

    String PROPERTY_CATALOG_TITLE = "jcr:title";

    String REQUEST_PARAMETER_CATEGORY_PATH = "categoryPath";
    String REQUEST_PARAMETER_SORTED_BY = "sortBy";
    String REQUEST_PARAMETER_PRICE_DOWN = "priceDown";
    String REQUEST_PARAMETER_PRICE_START = "priceStart";
    String REQUEST_PARAMETER_PRICE_END = "priceEnd";
    String REQUEST_PARAMETER_DATE = "date";

    String PARTNER_USERS_ROOT_PATH = "/home/users/wedding/partners";

    Object apply(SlingHttpServletRequest request);

}
