package wedding.core.rest.core;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.data.Constants;
import wedding.core.rest.site.RestFieldCore;
import wedding.core.utils.WeddingResourceUtil;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@SlingServlet(paths = {"/services/rest"})
public class MainRestServlet extends SlingSafeMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(WeddingResourceUtil.class);

    private BundleContext bundleContext;

    @Activate
    public void activate(ComponentContext componentContext) {
        bundleContext = componentContext.getBundleContext();
    }

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws ServletException, IOException {
        RequestPathInfo pathInfo = request.getRequestPathInfo();
        String json = Optional.ofNullable(request.getQueryString())
                .map(query -> processWithQuery(query, pathInfo, request))
                .orElseGet(() -> processWithOutQuery(pathInfo, request));
        response.setContentType(Constants.RESPONSE_JSON_SETTING);
        response.getWriter().write(json);
    }
    private String processWithOutQuery(RequestPathInfo pathInfo, SlingHttpServletRequest slingHttpServletRequest) {
        return Optional.of(pathInfo.getSelectors())
                .filter(ArrayUtils::isNotEmpty)
                .map(MainRestServlet::getFirstSelectorFromArray)
                .map(name -> ((RestFieldCore) bundleContext.getService(getServesReferenceFromContext(name))))
                .map(restFieldCore -> restFieldCore.apply(slingHttpServletRequest, null))
                .map(WeddingResourceUtil::toJson)
                .orElse(StringUtils.EMPTY);
    }


    private String processWithQuery(String query, RequestPathInfo pathInfo, SlingHttpServletRequest slingHttpServletRequest) {
        // TODO: implementation
        return null;
    }

    private static String getFirstSelectorFromArray(String[] selectors){
        return Arrays.stream(selectors)
                .findFirst()
                .orElse(StringUtils.EMPTY);
    }

    private ServiceReference getServesReferenceFromContext(String name) {
        return bundleContext.getServiceReference(RestFieldCore.class.getPackage().getName() + Constants.DOT + name);
    }

}
