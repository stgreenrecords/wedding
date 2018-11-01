package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.model.TenderModel;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Optional;


@Component(immediate = true)
@Service(Tenders.class)
@Properties({
        @Property(name = AbstractResFieldCore.PROPERTY_EXTENSION, value = "tenders"),
        @Property(name = AbstractResFieldCore.PROPERTY_REST_RESOURCE_TYPE, value = "tender"),
        @Property(name = AbstractResFieldCore.PROPERTY_MODEL_CLASS, classValue = TenderModel.class)
})
public class Tenders extends AbstractResFieldCore {

    private Comparator<TenderModel> applySorting(final SlingHttpServletRequest request) {
        return Optional.ofNullable(request.getParameter(REQUEST_PARAMETER_SORTED_BY))
                .map(Comparators::getComparatorByName)
                .orElse(Comparators.COMPARATOR_BY_DATE_PUBLISHING.getComparator());
    }

    private enum Comparators {

        COMPARATOR_BY_DATE_PUBLISHING(REQUEST_PARAMETER_SORT_DATE_PUBLISHING,
                Comparator.comparing(TenderModel::getDatePublication).reversed());

        private Comparator<TenderModel> comparator;
        private String comparatorName;

        Comparators(String comparatorName, Comparator<TenderModel> comparator) {
            this.comparator = comparator;
            this.comparatorName = comparatorName;
        }

        public static Comparator<TenderModel> getComparatorByName(String comparatorName) {
            return Arrays.stream(Comparators.values())
                    .filter(comparator -> comparator.getComparatorName().equals(comparatorName))
                    .map(Comparators::getComparator)
                    .findAny().orElse(null);
        }

        public String getComparatorName() {
            return comparatorName;
        }

        public Comparator<TenderModel> getComparator() {
            return comparator;
        }
    }

}
