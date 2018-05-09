package wedding.core.adapters;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.AdapterFactory;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.adapters.wrapper.CreateUserRequest;
import wedding.core.rest.util.ServletMapping;
import wedding.core.utils.ReflectionUtil;
import wedding.core.utils.SlingModelUtil;
import wedding.core.utils.WeddingResourceUtil;

import java.io.IOException;
import java.util.*;

@Component(immediate = true, metatype = true)
@Service
public class ModelAdapter implements AdapterFactory {

    private static final Logger LOG = LoggerFactory.getLogger(ModelAdapter.class);

    private static final String MODELS_PACKAGE = "wedding.core.model";

    @Reference
    private ConfigurationAdmin configAdmin;

    @Activate
    public void activate(ComponentContext componentContext) {
        String propertyAdaptables = "adaptables";
        String propertyAdapters = "adapters";
        try {
            Configuration config = configAdmin.getConfiguration(
                    this.getClass().getName());
            final Dictionary props = Optional.ofNullable(config.getProperties()).orElse(new Hashtable());

            final String adaptablesOld = (String) props.get(propertyAdaptables);
            final String[] adaptersOld = (String[]) props.get(propertyAdapters);
            final String adaptables = SlingHttpServletRequest.class.getName();
            final String[] adapters = ReflectionUtil.getAllClassesFromPackage(componentContext.getBundleContext().getBundle(), MODELS_PACKAGE);
            if (adaptables.equals(adaptablesOld) && Arrays.asList(adapters).containsAll(Arrays.asList(adaptersOld))) {
                return;
            }
            props.put(propertyAdaptables, adaptables);
            props.put(propertyAdapters, adapters);
            config.update(props);
        } catch (IOException e) {
            LOG.info(e.getMessage());
        }
    }

    @Override
    public <AdapterType> AdapterType getAdapter(Object adaptable, Class<AdapterType> aClass) {
        if (adaptable instanceof SlingHttpServletRequest) {
            SlingHttpServletRequest request = (SlingHttpServletRequest) adaptable;
            return adaptRequestToModel(request, aClass);
        }
        return null;
    }

    private <AdapterType> AdapterType adaptRequestToModel(SlingHttpServletRequest request, Class<AdapterType> aClass) {
        final String id = WeddingResourceUtil.getId(request);
        final String path = request.getParameter("path");
        Resource modelResource = null;
        if (StringUtils.isEmpty(id)) {
            modelResource = StringUtils.isNotEmpty(path)
                    ? SlingModelUtil.createModelResource(request, path)
                    : WeddingResourceUtil.getResourceByID(request.getResourceResolver()).apply(id);
        }

        return (AdapterType) Optional.ofNullable(modelResource)
                .map(resource -> resource.adaptTo(aClass))
                .map(model -> setPropertyToModel(request, model))
                .orElse(null);
    }

    private Object setPropertyToModel(SlingHttpServletRequest request, Object model) {
        Enumeration parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            Optional.of((String) parameterNames.nextElement())
                    .ifPresent(parameter -> ReflectionUtil.setFieldValueDeep(parameter, request.getParameterValues(parameter), model));
        }
        return model;
    }

}
