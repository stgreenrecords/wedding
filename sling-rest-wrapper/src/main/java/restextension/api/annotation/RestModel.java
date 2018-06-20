package restextension.api.annotation;

import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.JcrConstants;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface RestModel {
    String modelMixin() default StringUtils.EMPTY;

    String extension();

    String nodeType() default JcrConstants.NT_UNSTRUCTURED;
}
