package wedding.core.rest.site;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.service.component.ComponentContext;
import wedding.core.model.WeddingBaseModel;
import wedding.core.rest.core.MainRestServlet;
import wedding.core.utils.SlingModelUtil;

import java.util.Dictionary;
import java.util.Optional;

@Component(immediate = true)
@Service(AbstractResFieldCore.class)
public class AbstractResFieldCore implements RestFieldCore {

    static final String PROPERTY_CATALOG_TITLE = "jcr:title";

    public static final String PROPERTY_EXTENSION = "servlet-extension";
    public static final String PROPERTY_MODEL_CLASS = "model-class";
    public static final String PROPERTY_SLING_RESOURCE_TYPE = "sling-resource-type";
    public static final String PROPERTY_JCR_PATH = "jcr-type";

    static final String REQUEST_PARAMETER_SORTED_BY = "sortBy";
    static final String REQUEST_PARAMETER_SORT_PRICE_DOWN = "priceDown";
    static final String REQUEST_PARAMETER_SORT_VIP_STATUS = "vipStatus";
    static final String REQUEST_PARAMETER_SORT_DATE_PUBLISHING = "datePublishing";

    static final String TENDER_QUERY = "SELECT * FROM [nt:unstructured] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/users%s]) %s AND resource.[wedding:resourceType] = 'tender'";
    static final String EVENT_QUERY = "SELECT * FROM [nt:unstructured] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/partners%s]) %s AND resource.[wedding:resourceType] = 'event'";
    public static final String PARTNER_QUERY = "SELECT * FROM [wedding:resource] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/partners%s]) %s";
    static final String USER_QUERY = "SELECT * FROM [wedding:resource] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/users%s]) %s";

    protected void activate(ComponentContext context){
        Dictionary dictionary = context.getProperties();
        String serviceClass = PropertiesUtil.toString(dictionary.get("service.pid"), StringUtils.EMPTY);
        String servletExtension = PropertiesUtil.toString(dictionary.get(PROPERTY_EXTENSION), StringUtils.EMPTY);
        Optional.of(MainRestServlet.servicesMap)
                .filter(map -> !map.containsKey(servletExtension))
                .ifPresent(map -> map.put(servletExtension, serviceClass));
    }

    @Override
    public Object getObject(SlingHttpServletRequest request) {
        return null;
    }

    @Override
    public Object updateObject(SlingHttpServletRequest request) {
        return null;
    }

    @Override
    public Object createObject(SlingHttpServletRequest request) {
        return null;
    }

    @Override
    public Object deleteObject(SlingHttpServletRequest request) {
        return null;
    }

    protected <M extends WeddingBaseModel> M createOrUpdateModel(SlingHttpServletRequest request, Class<M> modelClass) {
        final M model = request.adaptTo(modelClass);
        if (model == null) {
            return null;
        }
        SlingModelUtil.updateModel(model);
        return model;
    }

    public <T extends WeddingBaseModel> T getModel(){
        return null;
    }

}
