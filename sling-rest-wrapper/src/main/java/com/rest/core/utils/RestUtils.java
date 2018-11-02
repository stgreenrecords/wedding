package com.rest.core.utils;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.zip.GZIPOutputStream;

@Component
@Service(RestUtils.class)
public class RestUtils {

    private static final Logger LOG = LoggerFactory.getLogger(RestUtils.class);

    @Reference
    private ResourceResolverFactory resolverFactory;

    private ResourceResolver resourceResolver;

    public static byte[] gzip(String data) throws Exception {
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
