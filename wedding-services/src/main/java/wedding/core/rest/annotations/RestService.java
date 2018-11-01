package wedding.core.rest.annotations;

public @interface RestService {

    String extension();

    Class modelClass();

    String nodeType() default "";

    String jcrPath() default "";


}
