package wedding.models.pages;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import wedding.core.services.RecaptchaService;
import wedding.models.BaseModel;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LoginPageModel extends BaseModel {

    public LoginPageModel(Resource resource) {
        super(resource);
    }

    @Inject
    private RecaptchaService recaptchaService;

    public String getReferrer() {
        String fullReferrer = null;
        if (fullReferrer != null && fullReferrer.contains("wedding") && !fullReferrer.contains("/wedding/registration.html")) {
            String withOutScheme = fullReferrer.substring(fullReferrer.indexOf("//") + 2, fullReferrer.length());
            return withOutScheme.substring(withOutScheme.indexOf("/"), withOutScheme.length());
        } else {
            fullReferrer = "/content/wedding.html";
        }
        return fullReferrer;
    }

    public List<CatalogCategoryPageModel> getCategoryList() {
        List<CatalogCategoryPageModel> catalogCategoryPageModels = new ArrayList<>();
        getCatalogRootPage().listChildren().forEachRemaining(
                categoryPage -> catalogCategoryPageModels.add(categoryPage.getContentResource().adaptTo(CatalogCategoryPageModel.class)));
        return catalogCategoryPageModels;
    }

    public String getRecaptchKey() {
        return recaptchaService.getKeyHtml();
    }

}
