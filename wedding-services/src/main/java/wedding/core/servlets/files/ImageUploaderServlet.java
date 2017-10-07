package wedding.core.servlets.files;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;

@SlingServlet(paths = {"/services/uploadImg"})
public class ImageUploaderServlet extends SlingAllMethodsServlet {

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        InputStream inputStream = request.getRequestParameter("avatar-image").getInputStream();
        try {
            Session session = request.getResourceResolver().adaptTo(Session.class);
            Node node = session.getNode("/content/test");
            JcrUtils.putFile(node, "testImage", "image/png", inputStream);
            session.save();
        } catch (RepositoryException e) {
            e.printStackTrace();
        }
    }

}
