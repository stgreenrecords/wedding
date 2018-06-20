package restextension.api.servlet;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.ComponentContext;
import restextension.Constants;
import restextension.api.processor.RestProcessor;
import restextension.util.WriterUtil;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Optional;
import java.util.function.Function;

@Component(immediate = true)
@Service
@Properties({
        @Property(name = "sling.servlet.paths", value = {""}),
})
public class RestServlet extends SlingAllMethodsServlet {
    private transient BundleContext bundleContext;

    @Activate
    public void activate(ComponentContext componentContext) {
        bundleContext = componentContext.getBundleContext();
    }

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws ServletException, IOException {
        processMethod(request, response, restProcessor -> restProcessor.getObject(request));
    }

    @Override
    protected void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws ServletException, IOException {
        processMethod(request, response, restProcessor -> restProcessor.createObject(request));
    }

    @Override
    protected void doPut(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        processMethod(request, response, restProcessor -> restProcessor.updateObject(request));
    }

    @Override
    protected void doDelete(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        processMethod(request, response, restProcessor -> restProcessor.deleteObject(request));
    }

    private void processMethod(SlingHttpServletRequest request, SlingHttpServletResponse response,
                               Function<RestProcessor, Object> method) throws IOException {
        writeResponse(
                processRequest(request.getRequestPathInfo())
                        .map(method)
                        .orElse(StringUtils.EMPTY), response);
    }

    private void writeResponse(Object responseObject, final SlingHttpServletResponse response) throws IOException {
        String responseJson = WriterUtil.toJson(responseObject);
        response.setContentType(Constants.RESPONSE_JSON_SETTING);
        response.getWriter().write(responseJson);
    }

    private Optional<RestProcessor> processRequest(RequestPathInfo pathInfo) {
        return Optional.ofNullable(pathInfo.getExtension())
                .map(extension -> RestProcessor.class) // TODO: 5/20/2018  implement mapper
                .map(this::getServesFromContextByClassName);
    }

    private RestProcessor getServesFromContextByClassName(Class<? extends RestProcessor> serviceClass) {
        return Optional.ofNullable(bundleContext.getServiceReference(serviceClass.getName()))
                .map(bundleContext::getService)
                .map(serviceClass::cast)
                .orElse(null);
    }
}
