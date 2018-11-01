package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.model.PartnerModel;
import wedding.core.utils.WeddingResourceUtil;

import javax.jcr.query.Query;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true)
@Service(Partners.class)
@Properties({
        @Property(name = AbstractResFieldCore.PROPERTY_EXTENSION, value = "partners"),
        @Property(name = AbstractResFieldCore.PROPERTY_CUSTOM_JCR_PRIMARY_TYPE, value = "rep:User"),
        @Property(name = AbstractResFieldCore.PROPERTY_CUSTOM_JCR_PATH, value = "/home/users/wedding/partners"),
        @Property(name = AbstractResFieldCore.PROPERTY_REST_RESOURCE_TYPE, value = "user"),
        @Property(name = AbstractResFieldCore.PROPERTY_MODEL_CLASS, classValue = PartnerModel.class)
})
public class Partners extends AbstractResFieldCore {

    @Override
    public Object getObject(SlingHttpServletRequest request) {
        return Optional.of(request.getResourceResolver())
                .map(resolver -> resolver.findResources(String.format(PARTNER_QUERY, WeddingResourceUtil.getSuffixPathFromRequest(request), WeddingResourceUtil.getIdQueryPart(request)), Query.SQL))
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(PartnerModel.class))
                .filter(Objects::nonNull)
                .limit(getLimit(request))
                .collect(Collectors.toList());
    }

    private enum Comparators {

        COMPARATOR_BY_PRICE_DOWN(REQUEST_PARAMETER_SORT_PRICE_DOWN,
                (firstUser, secondUser) -> Integer.valueOf(firstUser.getPriceStart()).
                        compareTo(Integer.parseInt(secondUser.getPriceStart()))),

        COMPARATOR_BY_VIP_STATUS(REQUEST_PARAMETER_SORT_VIP_STATUS,
                Comparator.comparing(PartnerModel::isVip).reversed());

        private Comparator<PartnerModel> comparator;
        private String comparatorName;

        Comparators(String comparatorName, Comparator<PartnerModel> comparator) {
            this.comparator = comparator;
            this.comparatorName = comparatorName;
        }

        public static Comparator<PartnerModel> getComparatorByName(String comparatorName) {
            return Arrays.stream(Comparators.values())
                    .filter(comparator -> comparator.getComparatorName().equals(comparatorName))
                    .map(Comparators::getComparator)
                    .findAny().orElse(null);
        }

        public String getComparatorName() {
            return comparatorName;
        }

        public Comparator<PartnerModel> getComparator() {
            return comparator;
        }
    }

}
