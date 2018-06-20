package wedding.core.adapters;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.AdapterFactory;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.utils.ReflectionUtil;
import wedding.core.utils.SlingModelUtil;
import wedding.core.utils.WeddingResourceUtil;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
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
            if (adaptablesOld != null && adaptersOld != null && adaptables.equals(adaptablesOld) && Arrays.asList(adapters).containsAll(Arrays.asList(adaptersOld))) {
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
        if (StringUtils.isNotEmpty(path)) {
            modelResource = SlingModelUtil.createModelResource(request, path, aClass);
            updateNewResource(modelResource);
        } else if (StringUtils.isNotEmpty(id)) {
            modelResource = WeddingResourceUtil.getResourceByID(request.getResourceResolver()).apply(id);
        }

        return (AdapterType) Optional.ofNullable(modelResource)
                .map(resource -> resource.adaptTo(aClass))
                .map(model -> setPropertyToModel(request, model))
                .orElse(null);
    }

    private void updateNewResource(Resource modelResource) {
        if (modelResource == null) {
            LOG.warn("Model resource is null");
            return;
        }
        final Node resourceNode = modelResource.adaptTo(Node.class);
        final ModifiableValueMap properties = modelResource.adaptTo(ModifiableValueMap.class);
        if (resourceNode == null || properties == null) {
            LOG.warn("Model node [] or properties [] is null", resourceNode, properties);
            return;
        }
        final String id = WeddingResourceUtil.generateId();
        properties.put(WeddingResourceUtil.REQUEST_PARAMETER_WEDDING_RESOURCE_ID, id);
        try {
            resourceNode.addMixin(WeddingResourceUtil.NT_WEDDING_RESOURCE_MIXIN);
            modelResource.getResourceResolver().commit();
        } catch (RepositoryException | PersistenceException e) {
            LOG.error(e.getMessage(), e);
        }
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
