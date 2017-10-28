package wedding.core.servlets;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.model.SortParameters;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

@Component(metatype = true, immediate = true)
@Service
@Properties({
        @Property(name = "sling.servlet.paths", value = "/services/productlist")
})
public class ProductListHelper extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(ProductListHelper.class);

    //<Group, <FilterName, FilterProperties>>
    private Map<String, Map<String, SortParameters>> sortParametersMap = new LinkedHashMap<String, Map<String, SortParameters>>();

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {

    }

}
