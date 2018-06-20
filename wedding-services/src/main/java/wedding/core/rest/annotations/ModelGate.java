package wedding.core.rest.annotations;

public @interface ModelGate {

    String extension();

    Class serviceClass();

    String nodeType();

    String jcrPath();


}
