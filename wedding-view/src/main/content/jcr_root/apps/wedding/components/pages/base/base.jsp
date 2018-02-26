<%@page session="false" pageEncoding="utf-8"%>
<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling" %>
<sling:defineObjects />
<sling:adaptTo adaptable="${resource}" adaptTo="org.apache.sling.api.resource.ValueMap" var="properties" />
<!DOCTYPE html>
<html lang="ru">
<head>
    <sling:include resourceType="/apps/wedding/components/pages/base/head.jsp"/>
</head>
<body>

    <header>
        <sling:include resourceType="/apps/wedding/components/pages/base/header.jsp" />
    </header>

    <sling:include resourceType="/apps/${properties['sling:resourceType']}/content.jsp" />
    
    <footer>
        <sling:include resourceType="/apps/wedding/components/pages/base/footer.jsp" />
    </footer>
    
</body>
</html>