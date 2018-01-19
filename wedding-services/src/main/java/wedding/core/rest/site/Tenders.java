package wedding.core.rest.site;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.model.TenderData;
import wedding.core.rest.util.PathHelper;
import wedding.core.utils.WeddingResourceUtil;

import javax.jcr.query.Query;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true)
@Service(Tenders.class)
public class Tenders implements RestFieldCore {

    private static final Logger LOG = LoggerFactory.getLogger(Tenders.class);

    @Override
    public Object apply(SlingHttpServletRequest request) {
        String[] selectors = request.getRequestPathInfo().getSelectors();
        if (selectors.length < 2) return StringUtils.EMPTY;
        String city = PathHelper.getCityFromSelectors(selectors);
        long limit = PathHelper.getLimitSelectors(selectors);
        return Optional.of(request.getResourceResolver())
                .map(resourceResolver -> resourceResolver.findResources(String.format(TENDER_QUERY, city), Query.SQL))
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(TenderData.class))
                .sorted(applySorting(request))
                .limit(limit)
                .collect(Collectors.toList());
    }

    private Comparator<TenderData> applySorting(final SlingHttpServletRequest request) {
        return Optional.ofNullable(request.getParameter(REQUEST_PARAMETER_SORTED_BY))
                .map(Comparators::getComparatorByName)
                .orElse(Comparators.COMPARATOR_BY_DATE_PUBLISHING.getComparator());
    }

    private enum Comparators {

        COMPARATOR_BY_DATE_PUBLISHING(REQUEST_PARAMETER_SORT_DATE_PUBLISHING,
                Comparator.comparing(TenderData::getDatePublication).reversed());

        private Comparator<TenderData> comparator;
        private String comparatorName;

        Comparators(String comparatorName, Comparator<TenderData> comparator) {
            this.comparator = comparator;
            this.comparatorName = comparatorName;
        }

        public static Comparator<TenderData> getComparatorByName(String comparatorName) {
            return Arrays.stream(Comparators.values())
                    .filter(comparator -> comparator.getComparatorName().equals(comparatorName))
                    .map(Comparators::getComparator)
                    .findAny().orElse(null);
        }

        public String getComparatorName() {
            return comparatorName;
        }

        public Comparator<TenderData> getComparator() {
            return comparator;
        }
    }

}
