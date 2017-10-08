package wedding.core.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.model.UserData;

import javax.jcr.query.Query;
import java.util.Iterator;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public final class WeddingResourceUtil {

    private static final Logger LOG = LoggerFactory.getLogger(WeddingResourceUtil.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private WeddingResourceUtil() {
    }

    public static <T> Stream<T> findModel(ResourceResolver resourceResolver, String query, Class<T> modelClass,
                                          int type, boolean parallel) {
        return iteratorToStream(resourceResolver.findResources(query, Query.JCR_SQL2), type, parallel)
                .map(modelClass::cast);
    }

    public static <T> Stream<T> findModel(ResourceResolver resourceResolver, String query, Class<T> modelClass) {
        return findModel(resourceResolver, query, modelClass, Spliterator.ORDERED, false);
    }

    public static <T> Stream<T> iteratorToStream(Iterator<T> iterator, int type, boolean parallel) {
        Spliterator<T> spliterator = Spliterators.spliteratorUnknownSize(iterator, type);
        return StreamSupport.stream(spliterator, parallel);
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

    public static UserData getUserData(ResourceResolver resourceResolver, String id) {
        final String query = String.format(Constants.USER_QUERY, id);
        return findModel(resourceResolver, query, UserData.class)
                .findFirst()
                .orElseGet(UserData::new);
    }
}
