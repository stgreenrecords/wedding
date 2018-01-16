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
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.data.Constants;
import wedding.core.rest.site.RestFieldCore;
import wedding.core.rest.util.ServletMapping;
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
        String json = Optional.of(pathInfo)
                .map(query -> processRequest(pathInfo, request))
                .orElse(StringUtils.EMPTY);
        response.setContentType(Constants.RESPONSE_JSON_SETTING);
        response.getWriter().write(json);
    }
    private String processRequest(RequestPathInfo pathInfo, SlingHttpServletRequest slingHttpServletRequest) {
        return Optional.of(pathInfo.getSelectors())
                .filter(ArrayUtils::isNotEmpty)
                .map(MainRestServlet::getFirstSelectorFromArray)
                .map(ServletMapping::getClassBySelector)
                .map(Class::getName)
                .map(this::getServesFromContextByClassName)
                .map(restFieldCore -> restFieldCore.apply(slingHttpServletRequest))
                .map(WeddingResourceUtil::toJson)
                .orElse(StringUtils.EMPTY);
    }

    private static String getFirstSelectorFromArray(String[] selectors){
        return Arrays.stream(selectors)
                .findFirst()
                .orElse(StringUtils.EMPTY);
    }

    private RestFieldCore getServesFromContextByClassName(String className) {
        return (RestFieldCore) Optional.ofNullable(className)
                .map(bundleContext::getServiceReference)
                .map(bundleContext::getService).orElse(null);
    }

}
