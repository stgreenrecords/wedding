package wedding.core.servlets.auth;

import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.data.Constants;
import wedding.core.services.users.PortalUserManager;

import javax.servlet.ServletException;
import java.io.*;

@Component(metatype = true, immediate = true)
@Service
@Properties({
        @Property(name = "sling.servlet.paths", value = "/services/registration")
})
public class RegistrationServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(RegistrationServlet.class);

    @Reference
    private PortalUserManager portalUserManager;

/*    @Reference
    private WeddingMailService weddingMailService;*/

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String type = request.getParameter("type");
        boolean registrationStatus = "partner".equals(type) ? doPartnerRegistration(type, request) : doPrivateRegistration(type, request);
        response.setContentType("text/html; charset=UTF-8");
        PrintWriter writer = response.getWriter();
        writer.print(registrationStatus ? Constants.STATUS_REGISTRATION_SUCCESS : Constants.STATUS_REGISTRATION_FAIL);
    }

    private boolean doPartnerRegistration(String type, SlingHttpServletRequest request) {
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String name = request.getParameter("name");
        String city = request.getParameter("city");
        String speciality = request.getParameter("speciality");
        String phone = request.getParameter("phone");
        String email = request.getParameter("email");
        String authType = request.getParameter("authType");
        String userID = request.getParameter("userID");
        boolean statusRegistration = portalUserManager.addPartner(firstName, lastName, userID, type, email, speciality, name, city, phone, authType);
/*        if (statusRegistration) {
            weddingMailService.sendRegistrationMail(email);
        }*/
        return statusRegistration;
    }

    private boolean doPrivateRegistration(String type, SlingHttpServletRequest request) {
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String city = request.getParameter("city");
        String email = request.getParameter("email");
        String authType = request.getParameter("authType");
        String userID = request.getParameter("userID");
        boolean statusRegistration = portalUserManager.addPortalUserViaSocial(userID, type, email, firstName, lastName, city, authType);
        if (statusRegistration) {
          //  weddingMailService.sendRegistrationMail(email);
        }
        return statusRegistration;
    }


}
