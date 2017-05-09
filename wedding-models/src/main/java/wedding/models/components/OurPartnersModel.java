package wedding.models.components;

import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import wedding.core.data.Constants;
import wedding.models.BaseModel;
import wedding.models.pages.ProductInfoModel;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = Resource.class)
public class OurPartnersModel extends BaseModel {

    public OurPartnersModel(Resource resource) {
        super(resource);
    }

    public List<ProductInfoModel> getPartners(){
        List<ProductInfoModel> partnerList = new ArrayList<>();
        if (getComponentProperties().containsKey(Constants.OUR_PARTNERS_PROPERTY_PATHS)){
            String[] paths = selfResource.getValueMap().get(Constants.OUR_PARTNERS_PROPERTY_PATHS, String[].class);
            for(String path: paths){
                Resource partnerResource = getResourceResolver().getResource(path);
                if(partnerResource != null){
                    Page partnerPage = partnerResource.adaptTo(Page.class);
                    ProductInfoModel partnerModel = partnerPage.getContentResource().adaptTo(ProductInfoModel.class);
                    partnerList.add(partnerModel);
                }
            }
        }
        return partnerList;
    }
}
