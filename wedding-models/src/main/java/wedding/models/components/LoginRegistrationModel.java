package wedding.models.components;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import wedding.models.BaseModel;
import wedding.models.pages.CatalogCategoryPageModel;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = Resource.class)
public class LoginRegistrationModel extends BaseModel{


    public LoginRegistrationModel(Resource resource) {
        super(resource);
    }

    public List<CatalogCategoryPageModel> getCategoryList() {
        List<CatalogCategoryPageModel> catalogCategoryPageModels = new ArrayList<>();
        getCatalogRootPage().listChildren().forEachRemaining(
                categoryPage -> catalogCategoryPageModels.add(categoryPage.getContentResource().adaptTo(CatalogCategoryPageModel.class)));
        return catalogCategoryPageModels;
    }
}
