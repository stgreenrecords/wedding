package wedding.models.components;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import wedding.core.data.Constants;
import wedding.models.BaseModel;
import wedding.models.beans.SlideBean;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = Resource.class)
public class CarouselModel extends BaseModel {

    List<SlideBean> slideBeanList;

    public CarouselModel(Resource resource) {
        super(resource);
    }

    public List<SlideBean> getSlideBeanList() {
        return slideBeanList == null ? collectSlides() : slideBeanList;
    }

    private List<SlideBean> collectSlides() {
        slideBeanList = new ArrayList();
        Resource selfResource = getSelfResource();
        Iterable<Resource> resourceIterator = selfResource.getChildren();
        for (Resource resource : resourceIterator) {
            ValueMap valueMap = resource.getValueMap();
            if (valueMap.containsKey("fileReference")) {
                slideBeanList.add(
                        new SlideBean(
                                valueMap.get(Constants.COMPONENT_IMAGE_REFERENCE_PROPERTY, String.class),
                                valueMap.containsKey(Constants.COMPONENT_SLIDER_EVENT_PROPERTY) ? valueMap.get(Constants.COMPONENT_SLIDER_EVENT_PROPERTY, String.class) : null,
                                valueMap.containsKey(Constants.COMPONENT_SLIDER_ALIGN_PROPERTY) ? valueMap.get(Constants.COMPONENT_SLIDER_ALIGN_PROPERTY, String.class) : null,
                                valueMap.containsKey(Constants.COMPONENT_SLIDER_TITLE_PROPERTY) ? valueMap.get(Constants.COMPONENT_SLIDER_TITLE_PROPERTY, String.class) : null
                        )
                );
            }
        }
        return slideBeanList;
    }


}
