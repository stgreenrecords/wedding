package wedding.core.rest.util;

import wedding.core.rest.site.CatalogCategories;
import wedding.core.rest.site.Partners;

import java.util.Arrays;

public enum ServletMapping {

    CATALOG_CATEGORIES("catalog-categories", CatalogCategories.class),
    PARTNERS("partners",Partners.class);

    private String selector;
    private Class servletClass;

    ServletMapping(String selector, Class servletClass) {
        this.selector = selector;
        this.servletClass = servletClass;
    }

    private String getSelector(){
        return selector;
    }

    private Class getServletClass(){
        return servletClass;
    }

    public static Class getClassBySelector(String selector){
        return Arrays.stream(ServletMapping.values())
                .filter(element -> element.getSelector().equals(selector))
                .map(ServletMapping::getServletClass)
                .findFirst()
                .orElse(null);

    }
}
