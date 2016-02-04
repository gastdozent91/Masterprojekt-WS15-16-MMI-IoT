package de.bht.mmi.iot.constants;

import de.bht.mmi.iot.util.ReflectionUtil;

import java.util.List;

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
        return ReflectionUtil.getAllValuesFromPublicStaticFinalFieldsWithTypeAndStartingWith(
                DbConstants.class, String.class, "TABLENAME_");
    }

    private DbConstants() { }


}
