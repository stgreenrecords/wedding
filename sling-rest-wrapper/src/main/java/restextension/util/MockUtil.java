package com.vodkamishkabalalaika.sling.restextension.util;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import com.vodkamishkabalalaika.sling.restextension.api.processor.RestProcessor;
import com.vodkamishkabalalaika.sling.restextension.example.MockRestProcessor;

import javax.jcr.query.Query;
import java.util.Iterator;
import java.util.UUID;
import java.util.function.Function;

public final class MockUtil {
    private MockUtil() {
    }

    public static Class<? extends RestProcessor> getModelClass(String extension) {
        return MockRestProcessor.class;
    }

    public static String generateId() {
        return UUID.randomUUID().toString();
    }

    public static Function<String, Resource> getResourceByID(ResourceResolver resolver) {
        return id -> {
            final String query = String.format(RESOURCE_BY_ID_QUERY, id);
            Iterator<Resource> resourceIterator = resolver.findResources(query, Query.SQL);
            return resourceIterator.hasNext() ? resourceIterator.next() : null;
        };
    }

}
