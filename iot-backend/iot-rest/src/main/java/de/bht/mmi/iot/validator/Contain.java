package de.bht.mmi.iot.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ContainValidator.class)
@Documented
public @interface Contain {

    String message() default "{de.bht.mmi.iot.constraints.contain}";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

    String[] value();

}
