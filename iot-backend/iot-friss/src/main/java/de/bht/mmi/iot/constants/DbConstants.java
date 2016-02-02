package de.bht.mmi.iot.constants;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import static java.lang.reflect.Modifier.*;

public class DbConstants {

    public static final String TABLENAME_USER = "User";

    public static final String TABLENAME_SENSOR = "Sensor";

    public static final String TABLENAME_GATEWAY = "Gateway";

    public static final String TABLENAME_CLUSTER = "Cluster";

    public static final String TABLENAME_BULK = "Bulk";

    public static final String ATTRIBUTE_ID = "id";

    public static final String ATTRIBUTE_USERNAME = "username";

    public static final String ATTRIBUTE_SENSOR_ID = "sensorId";

    public static final String ATTRIBUTE_BULK_RECEIVED = "bulkReceived";

    public static List<String> getAllTableNames() {
        final Class<DbConstants> dbConstantsClass = DbConstants.class;
        final Field[] declaredFields = dbConstantsClass.getDeclaredFields();
        final List<String> tableNames = new ArrayList<>(declaredFields.length);
        for (Field field : declaredFields) {
            final int fieldModifiers = field.getModifiers();
            if (isPublicStaticFinal(fieldModifiers) && field.getType().equals(String.class) &&
                    field.getName().startsWith("TABLENAME_")) {
                try {
                    tableNames.add((String) field.get(null));
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(String.format("Could not access %s fields",
                            dbConstantsClass.getSimpleName()), e);
                }
            }
        }
        return tableNames;
    }

    private static boolean isPublicStaticFinal(int modifiers) {
        return isPublic(modifiers) && isStatic(modifiers) && isFinal(modifiers);
    }

    private DbConstants() { }


}
