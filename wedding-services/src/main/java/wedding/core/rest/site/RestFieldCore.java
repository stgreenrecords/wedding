package wedding.core.rest.site;

import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.rest.util.PathHelper;

public interface RestFieldCore {

    String PROPERTY_CATALOG_TITLE = "jcr:title";

    String REQUEST_PARAMETER_SORTED_BY = "sortBy";
    String REQUEST_PARAMETER_SORT_PRICE_DOWN = "priceDown";
    String REQUEST_PARAMETER_SORT_VIP_STATUS = "priceDown";
    String REQUEST_PARAMETER_SORT_DATE_PUBLISHING = "datePublishing";
    String REQUEST_PARAMETER_USER_ID = "userId";


    String PARTNER_USERS_ROOT_PATH = "/home/users/wedding/partners";

    String TENDER_QUERY = "SELECT * FROM [nt:unstructured] AS tender WHERE ISDESCENDANTNODE([/home/users/wedding/users/%s]) AND NAME() = 'tender'";
    String PARTNER_QUERY = "SELECT * FROM [rep:User] AS user WHERE ISDESCENDANTNODE([/home/users/wedding/partners/%s/%s])";
    String USER_QUERY = "SELECT * FROM [rep:User] AS user WHERE ISDESCENDANTNODE([/home/users/wedding/users/%s/]) %s";
    String PART_USER_QUERY = "AND user.[userId] = '%s'";


    Object apply(SlingHttpServletRequest request);

    default long getLimit(String[] selectors) {
        return PathHelper.getLimitSelectors(selectors);
    }

    default String getCity(String[] selectors) {
        return PathHelper.getCityFromSelectors(selectors);
    }

    default String getSpeciality(String[] selectors) {
        return PathHelper.getSpecialityFromSelectors(selectors);
    }



}
