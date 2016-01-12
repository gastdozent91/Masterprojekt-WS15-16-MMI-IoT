package de.bht.mmi.iot.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Collection;

public class ContainValidator implements ConstraintValidator<Contain, Collection<String>> {

    private String[] toCheckFor;

    @Override
    public void initialize(Contain constraintAnnotation) {
        this.toCheckFor = constraintAnnotation.value();
    }

    @Override
    public boolean isValid(Collection<String> value, ConstraintValidatorContext context) {
        if (value == null || value.size() == 0) {
            return false;
        }

        for (String s : toCheckFor) {
            if (value.contains(s))
                return true;
        }
        return false;
    }

}
