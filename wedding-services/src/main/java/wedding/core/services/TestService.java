package wedding.core.services;

import com.rest.core.fields.AbstractResFieldCore;
import org.apache.felix.scr.annotations.*;

@Component(immediate = true, label = "Test Rest Field Core", metatype = true)
@Service(AbstractResFieldCore.class)
@Properties({
        @Property(name = AbstractResFieldCore.PROPERTY_DEFAULT_TYPE_ID, value = "testType"),
        @Property(name = AbstractResFieldCore.PROPERTY_DEFAULT_JCR_PATH, value = "/content/test")
})
public class TestService extends AbstractResFieldCore {

}