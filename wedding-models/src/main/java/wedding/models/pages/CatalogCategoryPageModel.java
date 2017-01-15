package wedding.models.pages;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import wedding.models.BaseModel;

import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class)
public class CatalogCategoryPageModel extends BaseModel {

    @Inject @Optional
    private String mainCategoryImage;

    @Inject @Optional
    private String smallCategoryImage;

    public CatalogCategoryPageModel(Resource resource) {
        super(resource);
    }

    public String getMainCategoryImage() {
        return mainCategoryImage;
    }

    public void setMainCategoryImage(String mainCategoryImage) {
        this.mainCategoryImage = mainCategoryImage;
    }

    public String getSmallCategoryImage() {
        return smallCategoryImage;
    }

    public void setSmallCategoryImage(String smallCategoryImage) {
        this.smallCategoryImage = smallCategoryImage;
    }
}
