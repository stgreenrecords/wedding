package wedding.core.utils;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
        if (!modelClass.isAnnotationPresent(Model.class)) {
            return;
        }
        final Field[] fields = modelClass.getDeclaredFields();
        Arrays.stream(fields)
                .filter(field -> Resource.class.equals(field.getType()))
                .filter(ReflectionUtil.isAnnotatedWith(Self.class))
                .map(ReflectionUtil.getFiledValue(model))
                .findFirst()
                .map(Resource.class::cast)
                .ifPresent(updateResourceFields(model, fields));
    }

    public static <M> void updateModel(SlingHttpServletRequest request, Class<M> modelClass, Function<M, M> updateAction) {
        Optional.ofNullable(request.adaptTo(modelClass))
                .map(updateAction)
                .ifPresent(SlingModelUtil::updateModel);
    }

    private static Consumer<Resource> updateResourceFields(Object model, Field[] fields) {
        return resource -> {
            Map<String, Object> modelValues = Arrays.stream(fields)
                    .filter(ReflectionUtil.isNotAnnotatedWith(Self.class))
                    .filter(ReflectionUtil.isAnnotatedWith(ValueMapValue.class))
                    .filter(field -> ReflectionUtil.getFiledValue(model).apply(field) != null)
                    .collect(Collectors.toMap(ReflectionUtil::getNamedValue, ReflectionUtil.getFiledValue(model), (v1, v2) -> v1));
            if (modelValues.isEmpty()) {
                return;
            }
            Optional.ofNullable(resource.adaptTo(ModifiableValueMap.class))
                    .ifPresent(properties -> {
                        modelValues.forEach((k, v) -> properties.remove(k));
                        properties.putAll(modelValues);
                    });
            try {
                resource.getResourceResolver().commit();
            } catch (PersistenceException e) {
                LOG.error("Error occurred while saving data [{}], for [{}]", modelValues, resource, e);
            }
        };
    }
}
