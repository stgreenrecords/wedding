package wedding.core.utils;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.api.JackrabbitSession;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Repository;
import javax.jcr.Session;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.zip.GZIPOutputStream;

@Component
@Service(WeddingUtils.class)
public class WeddingUtils {

    private static final Logger LOG = LoggerFactory.getLogger(WeddingUtils.class);

    @Reference
    private ResourceResolverFactory resolverFactory;

    private ResourceResolver resourceResolver;

    public static byte[] gzip(String data) throws Exception{
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        GZIPOutputStream gzip = new GZIPOutputStream(byteArrayOutputStream);
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(gzip, StandardCharsets.UTF_8);
        outputStreamWriter.write(data);
        outputStreamWriter.close();
        return byteArrayOutputStream.toByteArray();
    }

    public ResourceResolver getResolver() {
        try {
            resourceResolver = resolverFactory.getAdministrativeResourceResolver(null);
        } catch (LoginException e) {
            e.printStackTrace();
        }
        return resourceResolver;
    }

}
