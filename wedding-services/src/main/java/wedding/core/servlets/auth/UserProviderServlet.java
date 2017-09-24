package wedding.core.servlets.auth;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.data.Constants;
import wedding.core.services.users.PortalUserManager;

import javax.servlet.ServletException;
import java.io.IOException;

@SlingServlet(paths = {"/services/getuser"})
public class UserProviderServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(UserProviderServlet.class);

    @Reference
    private PortalUserManager portalUserManager;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String userID = request.getParameter(Constants.USER_ID_PARAMETER);
        String authType = request.getParameter(Constants.AUTH_TYPE_PARAMETER);
        if (portalUserManager.isUserExist(userID, authType)){
            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write(portalUserManager.getPortalUser(userID, authType).toString());
        }
    }
}
