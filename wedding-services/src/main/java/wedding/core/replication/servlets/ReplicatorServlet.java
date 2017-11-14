package wedding.core.replication.servlets;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import wedding.core.replication.Replicator;

import javax.jcr.RepositoryException;
import javax.servlet.ServletException;
import java.io.IOException;

@SlingServlet(paths = "/services/replicator")
public class ReplicatorServlet extends SlingAllMethodsServlet {

    @Reference
    private Replicator replicator;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException, ServletException {
        final String path = request.getParameter("path");
        final String contentPath = StringUtils.isEmpty(path) ? "/content/tnp" : path;
        try {
            replicator.replicate(contentPath);
        } catch (RepositoryException e) {
            response.getWriter().println(e);
        }
    }
}
