package wedding.core.adapters;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.AdapterFactory;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.utils.ReflectionUtil;
import wedding.core.utils.WeddingResourceUtil;

import java.io.IOException;
import java.util.Dictionary;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Optional;

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
            Dictionary props = Optional.ofNullable(config.getProperties()).orElse(new Hashtable());

            if (props.get(propertyAdaptables) != null && props.get(propertyAdapters) != null) return;
            props.put(propertyAdaptables, SlingHttpServletRequest.class.getName());
            props.put(propertyAdapters, ReflectionUtil.getAllClassesFromPackage(componentContext.getBundleContext().getBundle(), MODELS_PACKAGE));
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
        Optional<Resource> modelResource;
        if (StringUtils.isEmpty(id)) {
//            modelResource = createResource(request);
            return null;
        }
        modelResource = Optional.ofNullable(WeddingResourceUtil.getResourceByID(request.getResourceResolver()).apply(id));

        return (AdapterType) modelResource.map(resource -> resource.adaptTo(aClass))
                .map(model -> setPropertyToModel(request, model))
                .orElse(null);
    }

    private Object setPropertyToModel(SlingHttpServletRequest request, Object model) {
        Enumeration parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            Optional.of((String) parameterNames.nextElement())
                    .filter(parameter -> ReflectionUtil.isFieldPresent(parameter, model))
                    .ifPresent(parameter -> ReflectionUtil.setFieldValue(parameter, request.getParameterValues(parameter), model));

        }
        return model;
    }

}
