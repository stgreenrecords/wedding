package wedding.core.rest.site;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.data.Constants;

import java.util.Optional;

public interface RestFieldCore {

    String REQUEST_PARAMETER_USER_ID = "userId";
    String REQUEST_PARAMETER_WEDDING_RESOURCE_ID = "wedding:resourceID";
    String PART_USER_QUERY = "AND user.[userId] = '%s'";

    Object getObject(SlingHttpServletRequest request);

    Object updateObject(SlingHttpServletRequest request);

    Object createObject(SlingHttpServletRequest request);

    Object deleteObject(SlingHttpServletRequest request);

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

    default String getId(SlingHttpServletRequest request) {
        String id = request.getParameter(REQUEST_PARAMETER_WEDDING_RESOURCE_ID);
        if (id == null) {
            id = request.getParameter(REQUEST_PARAMETER_USER_ID);
        }
        return id;
    }

    default String getIdQueryPart(SlingHttpServletRequest request) {
        return Optional.ofNullable(getId(request))
                .map(user -> String.format(PART_USER_QUERY, user))
                .orElse(StringUtils.EMPTY);
    }
}
