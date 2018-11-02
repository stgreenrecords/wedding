package com.rest.core.resolver;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Map;

@Component(
        label = "Resolver Provider",
        immediate = true,
        metatype = true
)
@Service(ResolverProvider.class)
public final class ResolverProvider {

    private static Logger LOG = LoggerFactory.getLogger(ResolverProvider.class);
    private static ResourceResolver RESOLVER;
    @Property
    private static String SERVICE = "provider.resolver.service";

    @Reference
    private ResourceResolverFactory rrf;

    public static ResourceResolver getResolver() {
        return RESOLVER;
    }

    @Activate
    @Modified
    public void init(Map<String, Object> properties) {
        final String service = PropertiesUtil.toString(properties.get(SERVICE), StringUtils.EMPTY);
        try {
         //   RESOLVER = rrf.getServiceResourceResolver(Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, service));
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
        }
    }
}
