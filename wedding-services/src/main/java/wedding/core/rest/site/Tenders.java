package wedding.core.rest.site;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.model.TenderModel;
import wedding.core.utils.WeddingResourceUtil;

import javax.jcr.query.Query;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true)
@Service(Tenders.class)
public class Tenders extends AbstractResFieldCore {

    @Override
    public Object getObject(SlingHttpServletRequest request) {
        return Optional.of(request.getResourceResolver())
                .map(resourceResolver -> resourceResolver.findResources(String.format(TENDER_QUERY, WeddingResourceUtil.getSuffixPathFromRequest(request)), Query.SQL))
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(TenderModel.class))
                .filter(Objects::nonNull)
                .sorted(applySorting(request))
                .limit(getLimit(request))
                .collect(Collectors.toList());
    }

    @Override
    public Object updateObject(SlingHttpServletRequest request) {
        return null;
    }

    @Override
    public Object createObject(SlingHttpServletRequest request) {
        return null;
    }

    @Override
    public Object deleteObject(SlingHttpServletRequest request) {
        return null;
    }

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
