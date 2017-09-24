package wedding.models.pages;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import wedding.models.BaseModel;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LoginPageModel extends BaseModel {

    public LoginPageModel(Resource resource) {
        super(resource);
    }

    public List<CatalogCategoryPageModel> getCategoryList() {
        List<CatalogCategoryPageModel> catalogCategoryPageModels = new ArrayList<>();
        getCatalogRootPage().listChildren().forEachRemaining(
                categoryPage -> catalogCategoryPageModels.add(categoryPage.getContentResource().adaptTo(CatalogCategoryPageModel.class)));
        return catalogCategoryPageModels;
    }

}
