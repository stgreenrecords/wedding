package wedding.core.adapters;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.AdapterFactory;

@Component
@Service(value = AdapterFactory.class)
@Properties({
        @Property(name = "adaptables", value = {
                "org.apache.sling.api.SlingHttpServletRequest"})})
public class ModelAdapter implements AdapterFactory {

    @Property(name = "adapters")
    protected static final String[] ADAPTER_CLASSES = getAllClasses();

    @Override
    public <AdapterType> AdapterType getAdapter(Object adaptable, Class<AdapterType> aClass) {
        if (adaptable instanceof SlingHttpServletRequest) {
            SlingHttpServletRequest request = (SlingHttpServletRequest) adaptable;
            return adaptRequestToModel(request, aClass);
        }
        return null;
    }

    private <AdapterType> AdapterType adaptRequestToModel(SlingHttpServletRequest request, Class<AdapterType> aClass) {
        //main adapt logic
        return null;
    }

    private static String[] getAllClasses() {
        //logic to collect all classes
        return null;
    }
}
