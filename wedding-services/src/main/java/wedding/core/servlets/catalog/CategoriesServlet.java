package wedding.core.servlets.catalog;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import wedding.core.model.Categories;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Spliterator;
import java.util.Spliterators;

import java.util.stream.StreamSupport;

@SlingServlet(paths = {"/services/categories"})
public class CategoriesServlet extends SlingSafeMethodsServlet{

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Resource catalogResource = request.getResourceResolver().getResource("/content/wedding-data/catalog");
        String[] categories = StreamSupport.stream(
                Spliterators.spliteratorUnknownSize(catalogResource.listChildren(), Spliterator.ORDERED),
                false).map(resource -> resource.getValueMap().get("jcr:title", String.class)).toArray(String[]::new);
        response.setContentType("application/json; charset=UTF-8");
        response.setContentType("");
        objectMapper.writeValue(response.getWriter(), new Categories(categories));

    }
}
