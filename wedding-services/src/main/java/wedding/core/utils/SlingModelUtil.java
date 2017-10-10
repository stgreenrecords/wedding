package wedding.core.utils;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

public final class SlingModelUtil {

    private static final Logger LOG = LoggerFactory.getLogger(SlingModelUtil.class);

    private SlingModelUtil() {
    }

    public static void updateModel(Object model) {
        final Class<?> modelClass = model.getClass();
        if (modelClass.getDeclaredAnnotation(Model.class) == null) {
            return;
        }
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
