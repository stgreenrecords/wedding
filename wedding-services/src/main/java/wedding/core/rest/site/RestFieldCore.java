package wedding.core.rest.site;

import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.data.Constants;

import java.util.Optional;

public interface RestFieldCore {

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

}
