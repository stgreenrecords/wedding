package wedding.core.servlets.auth;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.jackrabbit.api.JackrabbitSession;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.util.Base64;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.data.Constants;
import wedding.core.services.users.PortalUserManager;
import wedding.core.utils.ServerUtil;
import wedding.core.utils.WeddingUtils;

import javax.jcr.RepositoryException;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;

@SlingServlet(paths = {"/services/checkuser"})
public class UserHelperServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(UserHelperServlet.class);

    @Reference
    private PortalUserManager portalUserManager;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String userID = request.getParameter(Constants.USER_ID_PARAMETER);
        String authType = request.getParameter(Constants.AUTH_TYPE_PARAMETER);
        if (portalUserManager.isUserExist(userID, authType)){
            response.getWriter().write(Boolean.TRUE.toString());
        } else {
            response.getWriter().write(Boolean.FALSE.toString());
        }
    }

}
