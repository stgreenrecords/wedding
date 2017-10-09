package wedding.core.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.model.UserData;

import javax.inject.Inject;
import javax.jcr.query.Query;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
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

    public static void updateModel(Object model) {
        final Class<?> modelClass = model.getClass();
        final Field[] fields = modelClass.getDeclaredFields();
        Arrays.stream(fields)
                .filter(field -> Resource.class.equals(field.getType()))
                .filter(field -> ArrayUtils.isNotEmpty(field.getDeclaredAnnotationsByType(Self.class)))
                .map(getFiledValue(model))
                .findFirst()
                .map(Resource.class::cast)
                .ifPresent(updateResourceFields(model, fields));
    }

    private static Consumer<Resource> updateResourceFields(Object model, Field[] fields) {
        return resource -> {
            Map<String, Object> modelValues = Arrays.stream(fields)
                    .filter(field -> ArrayUtils.isEmpty(field.getDeclaredAnnotationsByType(Self.class)))
                    .filter(field -> ArrayUtils.isNotEmpty(field.getDeclaredAnnotationsByType(Inject.class)))
                    .filter(field -> getFiledValue(model).apply(field) != null)
                    .collect(Collectors.toMap(Field::getName, getFiledValue(model), (v1, v2) -> v1));
            if (modelValues.isEmpty()) {
                return;
            }
            Optional.ofNullable(resource.adaptTo(ModifiableValueMap.class))
                    .ifPresent(properties -> properties.putAll(modelValues));
            try {
                resource.getResourceResolver().commit();
            } catch (PersistenceException e) {
                LOG.error("Error occurred while saving data [{}], for [{}]", new Object[] {modelValues, resource, e});
            }
        };
    }

    private static Function<Field, Object> getFiledValue(Object object) {
        return field -> {
            try {
                boolean accessible = field.isAccessible();
                field.setAccessible(true);
                Object value = field.get(object);
                field.setAccessible(accessible);
                return value;
            } catch (IllegalAccessException e) {
                return null;
            }
        };
    }
}
