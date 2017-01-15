package wedding.models.pages;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import wedding.models.BaseModel;

@Model(adaptables = Resource.class)
public class ProductModel extends BaseModel {

    public ProductModel(Resource resource) {
        super(resource);
    }
}
