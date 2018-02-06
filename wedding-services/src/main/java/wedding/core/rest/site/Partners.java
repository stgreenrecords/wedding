package wedding.core.rest.site;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import wedding.core.model.UserData;
import wedding.core.rest.util.PathHelper;
import wedding.core.utils.WeddingResourceUtil;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(immediate = true)
@Service(Partners.class)
public class Partners implements RestFieldCore {

    @Override
    public Object apply(SlingHttpServletRequest request) {
        String[] selectors = request.getRequestPathInfo().getSelectors();
        if (selectors.length < 3) return StringUtils.EMPTY;
        String speciality = PathHelper.getSpecialityFromSelectors(selectors);
        String city = PathHelper.getCityFromSelectors(selectors);
        long limit = PathHelper.getLimitSelectors(selectors);
        return Optional.ofNullable(request.getResourceResolver().getResource(PARTNER_USERS_ROOT_PATH))
                .map(partnerRoot -> partnerRoot.getChild(speciality))
                .map(specialityResource -> specialityResource.getChild(city))
                .map(Resource::listChildren)
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(UserData.class))
                .filter(applyFilters(request))
                .sorted(applySorting(request))
                .limit(limit)
                .collect(Collectors.toList());
    }

    private Predicate<UserData> applyFilters(final SlingHttpServletRequest request) {
        return userData -> Arrays.stream(Filters.values())
                .allMatch(filter -> filter.applyFilter(userData, request));
    }


    private Comparator<UserData> applySorting(final SlingHttpServletRequest request) {
        return Optional.ofNullable(request.getParameter(REQUEST_PARAMETER_SORTED_BY))
                .map(Comparators::getComparatorByName)
                .orElse(null);
    }

    private enum Comparators{

        COMPARATOR_BY_PRICE_DOWN(REQUEST_PARAMETER_SORT_PRICE_DOWN,
                (firstUser, secondUser) -> Integer.valueOf(firstUser.getPriceStart()).
                        compareTo(Integer.parseInt(secondUser.getPriceStart()))),

        COMPARATOR_BY_VIP_STATUS(REQUEST_PARAMETER_SORT_VIP_STATUS,
                Comparator.comparing(UserData::isVip).reversed());

        private Comparator<UserData> comparator;
        private String comparatorName;

        Comparators(String comparatorName, Comparator<UserData> comparator){
            this.comparator = comparator;
            this.comparatorName = comparatorName;
        }

        public static Comparator<UserData> getComparatorByName(String comparatorName){
            return Arrays.stream(Comparators.values())
                    .filter(comparator -> comparator.getComparatorName().equals(comparatorName))
                    .map(Comparators::getComparator)
                    .findAny().orElse(Comparators.COMPARATOR_BY_VIP_STATUS.getComparator());
        }

        public String getComparatorName() {
            return comparatorName;
        }

        public Comparator<UserData> getComparator() {
            return comparator;
        }
    }

    private enum Filters {

        FILTER_BY_PRICE_START(((userData, request) ->
                Filters.parseIntegerFromRequest(request, REQUEST_PARAMETER_PRICE_START)
                        .map(priceStart -> priceStart <= Integer.parseInt(userData.getPriceStart()))
                        .orElse(true)
        )),

        FILTER_BY_PRICE_END(((userData, request) ->
                Filters.parseIntegerFromRequest(request, REQUEST_PARAMETER_PRICE_END)
                        .map(endPrice -> Integer.parseInt(userData.getPriceEnd()) <= endPrice)
                        .orElse(true)
        ));


        private BiFunction<UserData, SlingHttpServletRequest, Boolean> function;

        Filters(final BiFunction<UserData, SlingHttpServletRequest, Boolean> function) {
            this.function = function;
        }

        public boolean applyFilter(UserData userData, SlingHttpServletRequest request) {
            return function.apply(userData, request);
        }

        private static Optional<Integer> parseIntegerFromRequest(final SlingHttpServletRequest request, String parameterName) {
            return Optional.ofNullable(request.getParameter(parameterName))
                    .map(Integer::parseInt);
        }

    }

}
