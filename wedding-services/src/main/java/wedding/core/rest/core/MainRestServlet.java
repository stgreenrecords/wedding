package wedding.core.rest.core;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.ComponentContext;
import wedding.core.data.Constants;
import wedding.core.rest.site.RestFieldCore;
import wedding.core.rest.util.ServletMapping;
import wedding.core.utils.WeddingResourceUtil;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.*;
import java.util.function.Function;

@SlingServlet(paths = {"/services/rest"})
public class MainRestServlet extends SlingAllMethodsServlet {

    private transient BundleContext bundleContext;

    public static final Map<String, String> servicesMap = new HashMap<>();

    @Activate
    public void activate(ComponentContext componentContext) {
        bundleContext = componentContext.getBundleContext();
    }

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws ServletException, IOException {
        processMethod(request, response, restFieldCore -> restFieldCore.getObject(request));
    }

    @Override
    protected void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws ServletException, IOException {
        processMethod(request, response, restFieldCore -> restFieldCore.createObject(request));
    }

    @Override
    protected void doPut(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        processMethod(request, response, restFieldCore -> restFieldCore.updateObject(request));
    }

    @Override
    protected void doDelete(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        processMethod(request, response, restFieldCore -> restFieldCore.deleteObject(request));
    }

    private void processMethod(SlingHttpServletRequest request, SlingHttpServletResponse response,
                               Function<RestFieldCore, Object> method) throws IOException {
        writeResponse(
                Optional.of(processRequest(request.getRequestPathInfo()))
                        .map(method)
                        .orElse(StringUtils.EMPTY), response);
    }

    private void writeResponse(Object responseObject, final SlingHttpServletResponse response) throws IOException {
        String responseJson = WeddingResourceUtil.toJson(responseObject);
        response.setContentType(Constants.RESPONSE_JSON_SETTING);
        response.getWriter().write(responseJson);
    }

    private RestFieldCore processRequest(RequestPathInfo pathInfo) {
        return Optional.ofNullable(pathInfo.getExtension())
                .map(getClassNameByExtension())
                .map(this::getServesFromContextByClassName)
                .orElse(null);
    }

    private RestFieldCore getServesFromContextByClassName(String className) {
        return (RestFieldCore) Optional.ofNullable(bundleContext.getServiceReference(className))
                .map(bundleContext::getService).orElse(null);
    }

    private Function<String, String> getClassNameByExtension(){
        return ext -> servicesMap.getOrDefault(ext, null);
    }

}
