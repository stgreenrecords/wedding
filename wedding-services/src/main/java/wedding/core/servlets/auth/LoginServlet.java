package wedding.core.servlets.auth;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.jackrabbit.api.JackrabbitSession;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.value.ValueFactoryImpl;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.data.Constants;
import wedding.core.services.CookieService;
import wedding.core.services.users.PortalUserManager;
import wedding.core.utils.WeddingUtils;

import javax.jcr.Repository;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.SimpleCredentials;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;
import java.util.UUID;

@SlingServlet(paths = {"/services/login"})
public class LoginServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(LoginServlet.class);

    @Reference
    private PortalUserManager portalUserManager;

    @Reference
    private Repository repository;

    @Reference
    private WeddingUtils weddingUtils;

    @Reference
    private CookieService cookieService;

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String pass = request.getParameter("pass");
        PrintWriter writer = null;
        LOG.info("TRY TO LOGIN AS: " + email);
        Authorizable authorizable = null;
        boolean validationStatus = false;
        ResourceResolver resolver = weddingUtils.getResolver();
        JackrabbitSession jackrabbitSession = Optional.of(resolver).
                map(resourceResolver -> (JackrabbitSession) resourceResolver.adaptTo(Session.class)).orElse(null);
        try {

            authorizable = jackrabbitSession.getUserManager().getAuthorizable(email);
            validationStatus = authorizable != null && authorizable.getProperty("verifiedStatus")[0].getBoolean();
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        }
        if (authorizable != null) {
            if (validationStatus) {
                Session session = null;
                try {
                    session = repository.login(new SimpleCredentials(email, pass.toCharArray()));
                } catch (RepositoryException e) {
                    writer = response.getWriter();
                    writer.print(Constants.STATUS_WRONG_PASS);
                    LOG.info("LOGIN FAIL");
                }
                if (session != null) {
                    LOG.info("USER " + session.getUserID() + " success login.");
                    writer = response.getWriter();
                    String uuid = UUID.randomUUID().toString();
                    try {
                        authorizable.setProperty(Constants.AUTH_COOKIE_NAME, ValueFactoryImpl.getInstance().createValue(uuid));
                        CookieService.addCookie(response, Constants.AUTH_COOKIE_NAME, uuid, Constants.LOGIN_COOKIE_AGE);
                        CookieService.addCookie(response, Constants.EMAIL_COOKIE_NAME, email, Constants.LOGIN_COOKIE_AGE);
                        jackrabbitSession.save();
                    } catch (RepositoryException e) {
                        LOG.info("SET SESSION FAIL");
                    }finally {
                        Optional.of(resolver).ifPresent(ResourceResolver::close);
                    }
                    writer.print(Constants.STATUS_SUCCESS_LOGIN);
                }
            } else {
                writer = response.getWriter();
                writer.print(Constants.STATUS_USER_IS_INVALID);
            }
        } else {
            writer = response.getWriter();
            writer.print(Constants.STATUS_USER_DOESNOT_EXIST);
        }
    }
}
