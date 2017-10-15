package wedding.core.servlets.user;

import com.google.common.collect.ImmutableMap;
import org.apache.commons.lang3.CharEncoding;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.ReferenceCardinality;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.post.JSONResponse;
import wedding.core.data.Constants;
import wedding.core.factory.BinaryFile;
import wedding.core.services.users.UserJsonService;
import wedding.core.utils.BinaryFileUtil;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.List;

@SlingServlet(paths = {"/services/user/profile"})
public class UserHelperServlet extends SlingAllMethodsServlet {

    @Reference(cardinality = ReferenceCardinality.MANDATORY_UNARY)
    private UserJsonService userJsonService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        final ResourceResolver resolver = request.getResourceResolver();
        response.setContentType(JSONResponse.RESPONSE_CONTENT_TYPE);
        response.setCharacterEncoding(CharEncoding.UTF_8);
        response.getWriter().println(userJsonService.getUserData(resolver, request.getParameter(Constants.USER_ID_PARAMETER)));
    }

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        final ResourceResolver resolver = request.getResourceResolver();
        final String jsonData = request.getParameter("data");
        List<BinaryFile> binaries = BinaryFileUtil.extractFromRequest(request, ImmutableMap.of(
                "avatar", false,
                "portfolio", true
        ));
        if (jsonData != null) {
            userJsonService.setUserData(resolver, jsonData);
        }
    }
}
