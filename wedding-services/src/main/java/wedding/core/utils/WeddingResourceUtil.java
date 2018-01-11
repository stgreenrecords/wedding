package wedding.core.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.model.UserData;

import javax.jcr.query.Query;
import java.io.IOException;
import java.util.*;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public final class WeddingResourceUtil {

    private static final Logger LOG = LoggerFactory.getLogger(WeddingResourceUtil.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private WeddingResourceUtil() {
    }

    public static <T> Stream<T> findModels(ResourceResolver resourceResolver, String query, Class<T> modelClass,
                                           int type, boolean parallel) {
        return iteratorToStream(resourceResolver.findResources(query, Query.JCR_SQL2), type, parallel)
                .map(resource -> resource.adaptTo(modelClass));
    }

    public static <T> Stream<T> findModels(ResourceResolver resourceResolver, String query, Class<T> modelClass) {
        return findModels(resourceResolver, query, modelClass, Spliterator.ORDERED, false);
    }

    public static <T> Stream<T> iteratorToStream(Iterator<T> iterator, int type, boolean parallel) {
        Spliterator<T> spliterator = Spliterators.spliteratorUnknownSize(iterator, type);
        return StreamSupport.stream(spliterator, parallel);
    }

    public static <T> Stream<T> iteratorToOrderedStream(Iterator<T> iterator) {
        Spliterator<T> spliterator = Spliterators.spliteratorUnknownSize(iterator, Spliterator.ORDERED);
        return StreamSupport.stream(spliterator, false);
    }

    public static String toJson(Object object) {
        try {
            return MAPPER.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            LOG.error("Error occurred while processing [{}] object", object, e);
            // TODO: 10/9/2017 JSON object
            return "{}";
        }
    }

    public static <T> Optional<T> fromJson(String json, Class<T> modelClass) {
        try {
            return Optional.ofNullable(MAPPER.readValue(json, modelClass));
        } catch (IOException e) {
            LOG.error("Error occurred while processing json [{}] object", json, e);
            return Optional.empty();
        }
    }

    public static Optional<UserData> getUserData(ResourceResolver resourceResolver, String id) {
        return getUserResource(resourceResolver, id)
                .map(resource -> resource.adaptTo(UserData.class));
    }

    public static Optional<Resource> getUserResource(ResourceResolver resourceResolver, String id) {
        final String query = String.format(Constants.USER_QUERY, id);
        return iteratorToOrderedStream(resourceResolver.findResources(query, Query.JCR_SQL2))
                .findFirst();
    }

    public static String getStringPropertyFromResource(Resource resource, String propertyName){
        return Optional.of(resource)
                .map(Resource::getValueMap)
                .map(properties -> properties.get(propertyName, String.class))
                .orElse(StringUtils.EMPTY);
    }

}
