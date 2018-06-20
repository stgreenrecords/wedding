package wedding.core.filters;

import org.apache.felix.scr.annotations.sling.SlingFilter;
import org.apache.felix.scr.annotations.sling.SlingFilterScope;
import org.apache.sling.api.SlingHttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import java.io.IOException;

@SlingFilter(label = "Cross-Origin Request Filter",
        metatype = true,
        scope = SlingFilterScope.REQUEST,
        order = -100)
public class CORSFilter implements Filter {

    private static final Logger log = LoggerFactory.getLogger(CORSFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        if (response instanceof SlingHttpServletResponse) {
            SlingHttpServletResponse slingResponse = (SlingHttpServletResponse) response;
            slingResponse.setHeader("Access-Control-Allow-Origin", "*");
        }

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.debug("Initialising CORS Filter");
    }

    @Override
    public void destroy() {
        log.debug("Destroying CORS Filter");
    }
}