package wedding.core.rest.util;

import wedding.core.rest.site.CatalogCategories;
import wedding.core.rest.site.Partners;
import wedding.core.rest.site.Tenders;
import wedding.core.rest.site.Users;

import java.util.Arrays;

public enum ServletMapping {

    CATALOG_CATEGORIES("catalog-categories", CatalogCategories.class, ""),
    PARTNERS("partners", Partners.class, "/home/users/wedding/partners"),
    USERS("users", Users.class, "/home/users/wedding/users"),
    TENDERS("tenders", Tenders.class, "/home/users/wedding/users");

    private String selector;
    private Class servletClass;
    private String jcrPath;

    ServletMapping(String selector, Class servletClass, String jcrPath) {
        this.selector = selector;
        this.servletClass = servletClass;
        this.jcrPath = jcrPath;
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
