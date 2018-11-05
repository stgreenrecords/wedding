package com.rest.core.fields;

import com.rest.core.MainRestServlet;
import com.rest.core.utils.SlingModelUtil;
import com.rest.core.utils.RestResourceUtil;
import jdk.nashorn.internal.ir.annotations.Reference;
import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.*;
import org.apache.felix.scr.annotations.Properties;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.apache.sling.jcr.api.SlingRepository;
import org.osgi.framework.Bundle;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.query.Query;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true, label = "Abstract Res Field Core", metatype = true)
@Service(AbstractResFieldCore.class)
@Properties({
        @Property(name = AbstractResFieldCore.PROPERTY_DEFAULT_JCR_PRIMARY_TYPE, value = "nt:unstructured"),
        @Property(name = AbstractResFieldCore.PROPERTY_DEFAULT_TYPE_ID, value = "restResourceType"),
        @Property(name = AbstractResFieldCore.PROPERTY_DEFAULT_JCR_PATH, value = "/content")
})
public class AbstractResFieldCore implements RestFieldCore {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractResFieldCore.class);

    public static final String PROPERTY_EXTENSION = "servlet-extension";
    public static final String PROPERTY_REST_RESOURCE_TYPE = "rest-resource-type";
    public static final String PROPERTY_DEFAULT_JCR_PRIMARY_TYPE = "default-jcr-primary-type";
    public static final String PROPERTY_DEFAULT_JCR_PATH = "default-jcr-path";
    public static final String PROPERTY_DEFAULT_TYPE_ID = "default-type-id";
    public static final String PROPERTY_JCR_PRIMARY_TYPE = "jcr-primary-type";
    public static final String PROPERTY_JCR_PATH = "jcr-path";
    public static final String PROPERTY_TYPE_ID = "type-id";
    public static final String PROPERTY_MODEL_CLASS = "model-class";

    private static final String DEFAULT_GET_QUERY = "SELECT * FROM [%s] AS resource WHERE ISDESCENDANTNODE([%s]) AND resource.[%s] = '%s'";

    private String defaultJcrPrimaryType;
    private String defaultJcrPath;
    private String defaultTypeId;
    private Class<?> modelClass;
    private String customJcrPath;
    private String customJcrPrimaryType;
    private String customTypeId;
    private String restResourceType;

    private static final Map<String, Properties> PROPERTIES_MAPPING = new HashMap<>();

    @Reference
    private SlingRepository slingRepository;

    @Activate
    @Modified
    protected void activate(ComponentContext componentContext) {
        Dictionary properties = componentContext.getProperties();

        String serviceClass = PropertiesUtil.toString(properties.get("service.pid"), StringUtils.EMPTY);
        String servletExtension = PropertiesUtil.toString(properties.get(PROPERTY_EXTENSION), StringUtils.EMPTY);
        String modelClassName = PropertiesUtil.toString(properties.get(PROPERTY_MODEL_CLASS), StringUtils.EMPTY);
        defaultJcrPath = PropertiesUtil.toString(properties.get(PROPERTY_DEFAULT_JCR_PATH), StringUtils.EMPTY);
        defaultJcrPrimaryType = PropertiesUtil.toString(properties.get(PROPERTY_DEFAULT_JCR_PRIMARY_TYPE), StringUtils.EMPTY);
        defaultTypeId = PropertiesUtil.toString(properties.get(PROPERTY_DEFAULT_TYPE_ID), StringUtils.EMPTY);
        customJcrPath = PropertiesUtil.toString(properties.get(PROPERTY_JCR_PATH), StringUtils.EMPTY);
        customJcrPrimaryType = PropertiesUtil.toString(properties.get(PROPERTY_JCR_PRIMARY_TYPE), StringUtils.EMPTY);
        customTypeId = PropertiesUtil.toString(properties.get(PROPERTY_TYPE_ID), StringUtils.EMPTY);
        restResourceType = PropertiesUtil.toString(properties.get(PROPERTY_REST_RESOURCE_TYPE), StringUtils.EMPTY);
        try {
            Bundle[] bundles = componentContext.getBundleContext().getBundles();
            Bundle modelBundel = null;
            for(Bundle bundle : bundles){
                if (bundle.getSymbolicName().contains("wedding-services")){
                    modelBundel = bundle;
                }
            }
            if (modelBundel != null) {

            }
            //setModelClass(Class.forName(modelClassName));
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
        Optional.of(MainRestServlet.SERVICES_MAP)
                .filter(map -> !map.containsKey(servletExtension))
                .ifPresent(map -> map.put(servletExtension, serviceClass));
    }

    @Override
    public Object getObject(SlingHttpServletRequest request) {
        return Optional.of(request.getResourceResolver())
                .map(resolver -> resolver.findResources(formatDefaultQuery(), Query.SQL))
                .map(RestResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(modelClass))
                .filter(Objects::nonNull)
                .limit(getLimit(request))
                .collect(Collectors.toList());
    }

    @Override
    public Object updateObject(SlingHttpServletRequest request) {
        return createOrUpdateModel(request, modelClass);
    }

    @Override
    public Object createObject(SlingHttpServletRequest request) {
        return createOrUpdateModel(request, modelClass);
    }

    @Override
    public Object deleteObject(SlingHttpServletRequest request) {
        return null;
    }

    private String formatDefaultQuery(){
        return String.format(DEFAULT_GET_QUERY,
                StringUtils.isNotEmpty(customJcrPrimaryType) ? customJcrPrimaryType : defaultJcrPrimaryType,
                StringUtils.isNotEmpty(customJcrPath) ? customJcrPath : defaultJcrPath,
                StringUtils.isNotEmpty(customTypeId) ? customTypeId : defaultTypeId, restResourceType);
    }

    public Object createOrUpdateModel(SlingHttpServletRequest request, Class modelClass) {
        final Object model = request.adaptTo(modelClass);
        if (model == null) {
            return null;
        }
        SlingModelUtil.updateModel(model);
        return model;
    }

    public String getDefaultJcrPrimaryType() {
        return defaultJcrPrimaryType;
    }

    public void setDefaultJcrPrimaryType(String defaultJcrPrimaryType) {
        this.defaultJcrPrimaryType = defaultJcrPrimaryType;
    }

    public String getDefaultJcrPath() {
        return defaultJcrPath;
    }

    public void setDefaultJcrPath(String defaultJcrPath) {
        this.defaultJcrPath = defaultJcrPath;
    }

    public String getDefaultTypeId() {
        return defaultTypeId;
    }

    public void setDefaultTypeId(String defaultTypeId) {
        this.defaultTypeId = defaultTypeId;
    }

    public Class getModelClass() {
        return modelClass;
    }

    public void setModelClass(Class modelClass) {
        this.modelClass = modelClass;
    }

    public String getCustomJcrPath() {
        return customJcrPath;
    }

    public void setCustomJcrPath(String customJcrPath) {
        this.customJcrPath = customJcrPath;
    }

    public String getCustomJcrPrimaryType() {
        return customJcrPrimaryType;
    }

    public void setCustomJcrPrimaryType(String customJcrPrimaryType) {
        this.customJcrPrimaryType = customJcrPrimaryType;
    }

    public String getCustomTypeId() {
        return customTypeId;
    }

    public void setCustomTypeId(String customTypeId) {
        this.customTypeId = customTypeId;
    }

    public String getRestResourceType() {
        return restResourceType;
    }

    public void setRestResourceType(String restResourceType) {
        this.restResourceType = restResourceType;
    }


}
