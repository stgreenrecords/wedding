package wedding.core.rest.util;

import wedding.core.rest.site.*;

import java.util.Arrays;
import java.util.function.Function;

public enum ServletMapping {

    CATALOG_CATEGORIES("catalog-categories", CatalogCategories.class, ""),
    PARTNERS("partners", Partners.class, "/home/users/wedding/partners"),
    USERS("users", Users.class, "/home/users/wedding/users"),
    EVENTS("events", Events.class, "/home/users/wedding/partners"),
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

    private String getJcrPath() {
        return jcrPath;
    }

    public static Class getClassBySelector(String selector){
        return getBySelector(selector, ServletMapping::getServletClass);
    }

    public static String getPathBySelector(String selector) {
        return getBySelector(selector, ServletMapping::getJcrPath);
    }

    private static <T> T getBySelector(String selector, Function<ServletMapping, T> function) {
        return Arrays.stream(ServletMapping.values())
                .filter(element -> element.getSelector().equals(selector))
                .map(function)
                .findFirst()
                .orElse(null);
    }
}
