package wedding.core.rest.site;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.data.Constants;

import java.util.Optional;

public interface RestFieldCore {

    String PROPERTY_CATALOG_TITLE = "jcr:title";

    String REQUEST_PARAMETER_SORTED_BY = "sortBy";
    String REQUEST_PARAMETER_SORT_PRICE_DOWN = "priceDown";
    String REQUEST_PARAMETER_SORT_VIP_STATUS = "priceDown";
    String REQUEST_PARAMETER_SORT_DATE_PUBLISHING = "datePublishing";
    String REQUEST_PARAMETER_USER_ID = "userId";

    String TENDER_QUERY = "SELECT * FROM [nt:unstructured] AS tender WHERE ISDESCENDANTNODE([/home/users/wedding/users%s]) AND NAME() = 'tender'";
    String PARTNER_QUERY = "SELECT * FROM [rep:User] AS user WHERE ISDESCENDANTNODE([/home/users/wedding/partners%s])";
    String USER_QUERY = "SELECT * FROM [rep:User] AS user WHERE ISDESCENDANTNODE([/home/users/wedding/users%s]) %s";
    String PART_USER_QUERY = "AND user.[userId] = '%s'";


    Object apply(SlingHttpServletRequest request);

    default long getLimit(SlingHttpServletRequest request) {
        return Optional.ofNullable(request.getRequestPathInfo().getSuffix())
                .map(suffix -> suffix.substring(suffix.indexOf(Constants.DOT) + 1))
                .filter(suf -> suf.contains(Constants.DOT))
                .map(suffix -> suffix.substring(0, suffix.indexOf(Constants.DOT)))
                .map(Integer::parseInt)
                .orElse(Integer.MAX_VALUE);
    }

    default String getSuffixPathFromRequest(SlingHttpServletRequest request) {
        return Optional.ofNullable(request.getRequestPathInfo().getSuffix())
                .map(suffix -> suffix.substring(0, suffix.indexOf(Constants.DOT)))
                .orElse(StringUtils.EMPTY);
    }


}
