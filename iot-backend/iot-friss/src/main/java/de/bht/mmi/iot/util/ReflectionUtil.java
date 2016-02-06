package de.bht.mmi.iot.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import static java.lang.reflect.Modifier.*;

public final class ReflectionUtil {

    @SuppressWarnings("unchecked")
    public static <T> List<T> getAllValuesFromPublicStaticFinalFieldsWithTypeAndStartingWith(
            Class<?> aClass, Class<T> type, String startingWith) {
        final Field[] declaredFields = aClass.getDeclaredFields();
        final List<T> fieldValues = new ArrayList<>(declaredFields.length);
        for (Field field : declaredFields) {
            final int fieldModifiers = field.getModifiers();
            if (isPublicStaticFinal(fieldModifiers) && field.getType().equals(type) &&
                    field.getName().startsWith(startingWith)) {
                try {
                    fieldValues.add((T) field.get(null));
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(String.format("Could not access %s fields", aClass.getSimpleName()), e);
                }
            }
        }
        return fieldValues;
    }

    private static boolean isPublicStaticFinal(int modifiers) {
        return isPublic(modifiers) && isStatic(modifiers) && isFinal(modifiers);
    }

    private ReflectionUtil() { }

}
