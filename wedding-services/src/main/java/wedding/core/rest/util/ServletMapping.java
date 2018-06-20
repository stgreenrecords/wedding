package wedding.core.rest.util;

import org.apache.jackrabbit.JcrConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import wedding.core.rest.site.*;

import java.util.Arrays;
import java.util.Optional;
import java.util.function.Function;

public enum ServletMapping {

    CATALOG_CATEGORIES("catalog-categories", CatalogCategories.class, JcrConstants.NT_UNSTRUCTURED, ""),
    PARTNERS("partners", Partners.class, "rep:User", "/home/users/wedding/partners"),
    USERS("users", Users.class, "rep:User", "/home/users/wedding/users"),
    EVENTS("events", Events.class, JcrConstants.NT_UNSTRUCTURED, "/home/users/wedding/partners"),
    MAIL("mail", Mail.class, JcrConstants.NT_UNSTRUCTURED, ""),
    TENDERS("tenders", Tenders.class, JcrConstants.NT_UNSTRUCTURED, "/home/users/wedding/users");

    private String extension;
    private Class servletClass;
    private String jcrPath;
    private String resourceType;

    ServletMapping(String selector, Class servletClass, String resourceType, String jcrPath) {
        this.extension = selector;
        this.servletClass = servletClass;
        this.resourceType = resourceType;
        this.jcrPath = jcrPath;
    }

    private String getExtension() {
        return extension;
    }

    private Class getServletClass() {
        return servletClass;
    }

    private String getResourceType() {
        return resourceType;
    }

    private String getJcrPath() {
        return jcrPath;
    }

    public static Class getClassByExtension(String extension) {
        return getByExtension(extension, ServletMapping::getServletClass);
    }

    public static String getResourceTypeFromRequest(SlingHttpServletRequest request) {
        return Optional.ofNullable(request.getRequestPathInfo().getExtension())
                .map(extension -> getByExtension(extension, ServletMapping::getResourceType))
                .orElse(JcrConstants.NT_UNSTRUCTURED);
    }

    public static String getPathByExtension(String selector) {
        return getByExtension(selector, ServletMapping::getJcrPath);
    }

    private static <T> T getByExtension(String selector, Function<ServletMapping, T> function) {
        return Arrays.stream(ServletMapping.values())
                .filter(element -> element.getExtension().equals(selector))
                .map(function)
                .findFirst()
                .orElse(null);
    }
}
