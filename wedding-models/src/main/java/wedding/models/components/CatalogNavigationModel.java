package wedding.models.components;

import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import wedding.models.BaseModel;
import wedding.models.pages.CatalogCategoryPageModel;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Model(adaptables = Resource.class)
public class CatalogNavigationModel extends BaseModel {

    List<CatalogCategoryPageModel> catalogCategoryPageModelList = new ArrayList();

    public CatalogNavigationModel(Resource resource) {
        super(resource);
    }

    public List<CatalogCategoryPageModel> getCatalogList() {
        if (getCatalogRootPage() != null) {
            Iterator<Page> pageIterator = getCatalogRootPage().listChildren();
            while (pageIterator.hasNext()) {
                Page categoryPage = pageIterator.next();
                catalogCategoryPageModelList.add(categoryPage.getContentResource().adaptTo(CatalogCategoryPageModel.class));
            }
        }
        return catalogCategoryPageModelList;
    }


}
