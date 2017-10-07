package wedding.core.servlets.user;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;

import javax.servlet.ServletException;
import java.io.IOException;

@SlingServlet(paths = {"/services/userEdit"})
public class UserHelperServlet extends SlingAllMethodsServlet {

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String priceStart;
        String priceEnd;
        String email;
        String website;
        String vkUrl;
        String facebookUrl;
        String instagramUrl;
        String about;

    }

}
