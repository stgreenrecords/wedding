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
import java.util.Optional;

@SlingServlet(paths = {"/services/rest"})
public class MainRestServlet extends SlingAllMethodsServlet {

    private transient BundleContext bundleContext;

    @Activate
    public void activate(ComponentContext componentContext) {
        bundleContext = componentContext.getBundleContext();
    }

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws ServletException, IOException {
        writeResponse(
                processRequest(request.getRequestPathInfo()).
                        map(restFieldCore -> restFieldCore.getObject(request)).
                        orElse(StringUtils.EMPTY), response);
    }

    @Override
    protected void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws ServletException, IOException {
        writeResponse(
                processRequest(request.getRequestPathInfo()).
                        map(restFieldCore -> restFieldCore.createObject(request)).
                        orElse(StringUtils.EMPTY), response);
    }

    @Override
    protected void doPut(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        writeResponse(
                processRequest(request.getRequestPathInfo()).
                        map(restFieldCore -> restFieldCore.updateObject(request)).
                        orElse(StringUtils.EMPTY), response);
    }

    @Override
    protected void doDelete(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        writeResponse(
                processRequest(request.getRequestPathInfo()).
                        map(restFieldCore -> restFieldCore.deleteObject(request)).
                        orElse(StringUtils.EMPTY), response);
    }

    private void writeResponse(Object responseObject, final SlingHttpServletResponse response) throws IOException {
        String responseJson = WeddingResourceUtil.toJson(responseObject);
        response.setContentType(Constants.RESPONSE_JSON_SETTING);
        response.getWriter().write(responseJson);
    }

    private Optional<RestFieldCore> processRequest(RequestPathInfo pathInfo) {
        return Optional.ofNullable(pathInfo.getExtension())
                .map(ServletMapping::getClassBySelector)
                .map(Class::getName)
                .map(this::getServesFromContextByClassName);
    }

    private RestFieldCore getServesFromContextByClassName(String className) {
        return (RestFieldCore) Optional.ofNullable(className)
                .map(bundleContext::getServiceReference)
                .map(bundleContext::getService).orElse(null);
    }

}
