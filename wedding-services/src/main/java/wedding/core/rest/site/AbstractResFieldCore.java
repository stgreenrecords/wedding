package wedding.core.rest.site;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.model.WeddingBaseModel;
import wedding.core.rest.core.MainRestServlet;
import wedding.core.utils.SlingModelUtil;
import wedding.core.utils.WeddingResourceUtil;

import javax.jcr.query.Query;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true)
@Service(AbstractResFieldCore.class)
@Properties({
        @Property(name = AbstractResFieldCore.PROPERTY_DEFAULT_JCR_PRIMARY_TYPE, value = "nt:unstructured"),
        @Property(name = AbstractResFieldCore.PROPERTY_DEFAULT_TYPE_ID, value = "wedding:resourceType"),
        @Property(name = AbstractResFieldCore.PROPERTY_DEFAULT_JCR_PATH, value = "/home/users/wedding/")
})
public class AbstractResFieldCore implements RestFieldCore {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractResFieldCore.class);

    static final String PROPERTY_CATALOG_TITLE = "jcr:title";

    public static final String PROPERTY_EXTENSION = "servlet-extension";
    public static final String PROPERTY_REST_RESOURCE_TYPE = "rest-resource-type";
    public static final String PROPERTY_DEFAULT_JCR_PRIMARY_TYPE = "default-jcr-primary-type";
    public static final String PROPERTY_DEFAULT_JCR_PATH = "default-jcr-path";
    public static final String PROPERTY_DEFAULT_TYPE_ID = "default-type-id";
    public static final String PROPERTY_CUSTOM_JCR_PRIMARY_TYPE = "custom-jcr-primary-type";
    public static final String PROPERTY_CUSTOM_JCR_PATH = "custom-jcr-path";
    public static final String PROPERTY_CUSTOM_TYPE_ID = "custom-type-id";
    public static final String PROPERTY_MODEL_CLASS = "model-class";
    public static final String PROPERTY_SLING_RESOURCE_TYPE = "sling-resource-type";
    public static final String PROPERTY_JCR_PATH = "jcr-type";

    static final String REQUEST_PARAMETER_SORTED_BY = "sortBy";
    static final String REQUEST_PARAMETER_SORT_PRICE_DOWN = "priceDown";
    static final String REQUEST_PARAMETER_SORT_VIP_STATUS = "vipStatus";
    static final String REQUEST_PARAMETER_SORT_DATE_PUBLISHING = "datePublishing";

    private static final String DEFAULT_GET_QUERY = "SELECT * FROM [%s] AS resource WHERE ISDESCENDANTNODE([%s]) AND resource.[%s] = '%s'";


    static final String TENDER_QUERY = "SELECT * FROM [nt:unstructured] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/users%s]) %s AND resource.[wedding:resourceType] = 'tender'";
    static final String EVENT_QUERY = "SELECT * FROM [nt:unstructured] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/partners%s]) %s AND resource.[wedding:resourceType] = 'event'";
    public static final String PARTNER_QUERY = "SELECT * FROM [wedding:resource] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/partners%s]) %s";
    static final String USER_QUERY = "SELECT * FROM [wedding:resource] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/users%s]) %s";

    private Class modelClass;
    private String defaultJcrPrimaryType;
    private String defaultJcrPath;
    private String defaultTypeId;
    private String customJcrPath;
    private String customJcrPrimaryType;
    private String customTypeId;
    private String restResourceType;

    @Activate
    protected void activate(Map properties) {
        String serviceClass = PropertiesUtil.toString(properties.get("service.pid"), StringUtils.EMPTY);
        String servletExtension = PropertiesUtil.toString(properties.get(PROPERTY_EXTENSION), StringUtils.EMPTY);
        String modelClassName = PropertiesUtil.toString(properties.get(PROPERTY_MODEL_CLASS), StringUtils.EMPTY);
        defaultJcrPath = PropertiesUtil.toString(properties.get(PROPERTY_DEFAULT_JCR_PATH), StringUtils.EMPTY);
        defaultJcrPrimaryType = PropertiesUtil.toString(properties.get(PROPERTY_DEFAULT_JCR_PRIMARY_TYPE), StringUtils.EMPTY);
        defaultTypeId = PropertiesUtil.toString(properties.get(PROPERTY_DEFAULT_TYPE_ID), StringUtils.EMPTY);
        customJcrPath = PropertiesUtil.toString(properties.get(PROPERTY_CUSTOM_JCR_PATH), StringUtils.EMPTY);
        customJcrPrimaryType = PropertiesUtil.toString(properties.get(PROPERTY_CUSTOM_JCR_PRIMARY_TYPE), StringUtils.EMPTY);
        customTypeId = PropertiesUtil.toString(properties.get(PROPERTY_CUSTOM_TYPE_ID), StringUtils.EMPTY);
        restResourceType = PropertiesUtil.toString(properties.get(PROPERTY_REST_RESOURCE_TYPE), StringUtils.EMPTY);
        try {
            setModelClass(Class.forName(modelClassName));
        } catch (ClassNotFoundException e) {
            LOG.error(e.getMessage());
        }
        Optional.of(MainRestServlet.servicesMap)
                .filter(map -> !map.containsKey(servletExtension))
                .ifPresent(map -> map.put(servletExtension, serviceClass));
    }

    @Override
    public Object getObject(SlingHttpServletRequest request) {
        return Optional.of(request.getResourceResolver())
                .map(resolver -> resolver.findResources(formatDefaultQuery(), Query.SQL))
                .map(WeddingResourceUtil::iteratorToOrderedStream)
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

    public <M extends WeddingBaseModel> M createOrUpdateModel(SlingHttpServletRequest request, Class<M> modelClass) {
        final M model = request.adaptTo(modelClass);
        if (model == null) {
            return null;
        }
        SlingModelUtil.updateModel(model);
        return model;
    }

    public Class getModel(){
        return modelClass;
    }

    private void setModelClass(Class modelClass) {
        this.modelClass = modelClass;
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

    public String getRestResourceType() {
        return restResourceType;
    }

    public void setRestResourceType(String restResourceType) {
        this.restResourceType = restResourceType;
    }
}
