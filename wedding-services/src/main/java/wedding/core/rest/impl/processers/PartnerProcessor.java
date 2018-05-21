package wedding.core.rest.impl.processers;

import restextension.api.annotation.ModelAdapter;
import restextension.api.processor.AbstractRestProcessor;
import wedding.core.model.PartnerModel;

import static wedding.core.rest.site.AbstractResFieldCore.PARTNER_QUERY;

@ModelAdapter(modelClass = PartnerModel.class)
public class PartnerProcessor extends AbstractRestProcessor {

    @Override
    public String getQuery() {
        return PARTNER_QUERY;
    }


}
