package wedding.core.rest.site;

import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.model.WeddingBaseModel;
import wedding.core.utils.SlingModelUtil;

public abstract class AbstractResFieldCore implements RestFieldCore {

    static final String PROPERTY_CATALOG_TITLE = "jcr:title";

    static final String REQUEST_PARAMETER_SORTED_BY = "sortBy";
    static final String REQUEST_PARAMETER_SORT_PRICE_DOWN = "priceDown";
    static final String REQUEST_PARAMETER_SORT_VIP_STATUS = "vipStatus";
    static final String REQUEST_PARAMETER_SORT_DATE_PUBLISHING = "datePublishing";

    static final String TENDER_QUERY = "SELECT * FROM [nt:unstructured] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/users%s]) %s AND resource.[wedding:resourceType] = 'tender'";
    static final String EVENT_QUERY = "SELECT * FROM [nt:unstructured] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/partners%s]) %s AND resource.[wedding:resourceType] = 'event'";
    static final String PARTNER_QUERY = "SELECT * FROM [wedding:resource] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/partners%s]) %s";
    static final String USER_QUERY = "SELECT * FROM [wedding:resource] AS resource WHERE ISDESCENDANTNODE([/home/users/wedding/users%s]) %s";

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

    protected <M extends WeddingBaseModel> M createModel(SlingHttpServletRequest request, Class<M> modelClass) {
        final M model = request.adaptTo(modelClass);
        if (model == null) {
            return null;
        }
        SlingModelUtil.updateModel(model);
        return model;
    }
}
