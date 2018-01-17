package wedding.core.rest.site;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import wedding.core.model.UserData;
import wedding.core.utils.WeddingResourceUtil;

import java.util.Arrays;
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
        String speciality = Arrays.stream(selectors).skip(1).findFirst().orElse(StringUtils.EMPTY);
        String city = Arrays.stream(selectors).skip(2).findFirst().orElse(StringUtils.EMPTY);
        return Optional.ofNullable(request.getResourceResolver().getResource(PARTNER_USERS_ROOT_PATH))
                .map(partnerRoot -> partnerRoot.getChild(speciality))
                .map(specialityResource -> specialityResource.getChild(city))
                .map(Resource::listChildren)
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(resource -> resource.adaptTo(UserData.class))
                .filter(applyFilters(request))
                .collect(Collectors.toList());
    }

    private Predicate<UserData> applyFilters(final SlingHttpServletRequest request) {
        return userData -> Arrays.stream(Filters.values()).
                anyMatch(filter -> !filter.applyFilter(userData, request));
    }

    private enum Filters{

        FILTER_BY_PRICE_START(((userData, request) -> {
            return Optional.ofNullable(request.getParameter(REQUEST_PARAMETER_PRICE_START))
                    .map(parameterValue -> Integer.parseInt(userData.getPriceStart()) < Integer.parseInt(parameterValue))
                    .orElse(true);
        })),

        FILTER_BY_PRICE_END(((userData, request) -> {
            return Optional.ofNullable(request.getParameter(REQUEST_PARAMETER_PRICE_END))
                    .map(parameterValue -> Integer.parseInt(userData.getPriceEnd()) < Integer.parseInt(parameterValue))
                    .orElse(true);
        }));

        private BiFunction<UserData, SlingHttpServletRequest, Boolean> function;

        Filters(final BiFunction<UserData, SlingHttpServletRequest, Boolean> function) {
            this.function = function;
        }

        public boolean applyFilter(UserData userData, SlingHttpServletRequest request){
            return function.apply(userData, request);
        }

    }


}
