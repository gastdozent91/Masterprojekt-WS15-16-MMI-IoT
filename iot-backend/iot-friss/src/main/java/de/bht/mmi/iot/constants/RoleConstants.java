package de.bht.mmi.iot.constants;

import de.bht.mmi.iot.util.ReflectionUtil;

import java.util.List;

public final class RoleConstants {

    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final String ROLE_USER = "ROLE_USER";

    public static final String ROLE_CREATE_CLUSTER = "ROLE_CREATE_CLUSTER";

    public static final String ROLE_CREATE_GATEWAY = "ROLE_CREATE_GATEWAY";

    public static final String ROLE_CREATE_SENSOR = "ROLE_CREATE_SENSOR";

    public static final String ROLE_DELETE_CLUSTER = "ROLE_DELETE_CLUSTER";

    public static final String ROLE_DELETE_GATEWAY = "ROLE_DELETE_CLUSTER";

    public static final String ROLE_DELETE_SENSOR = "ROLE_DELETE_CLUSTER";

    public static final String ROLE_UPDATE_CLUSTER = "ROLE_UPDATE_CLUSTER";

    public static final String ROLE_UPDATE_GATEWAY = "ROLE_UPDATE_GATEWAY";

    public static final String ROLE_UPDATE_SENSOR = "ROLE_UPDATE_SENSOR";

    public static final String ROLE_GET_ALL_CLUSTER = "ROLE_GET_ALL_CLUSTER";

    public static final String ROLE_GET_ALL_GATEWAY = "ROLE_GET_ALL_GATEWAY";

    public static final String ROLE_GET_ALL_SENSOR = "ROLE_GET_ALL_SENSOR";

    /**
     * Spring Expression Language (SpEL) expression - hasRole admin
     */
    public static final String HAS_ROLE_ADMIN = "hasRole('" + ROLE_ADMIN + "')";

    /**
     * Spring Expression Language (SpEL) expression - hasRole user
     */
    public static final String HAS_ROLE_USER = "hasRole('" + ROLE_USER + "')";

    /**
     * Spring Expression Language (SpEL) expression - hasRole admin or user
     */
    public static final String HAS_ROLE_ADMIN_OR_USER =
            "hasAnyRole('" + ROLE_ADMIN + "','" + ROLE_USER + "')";

    public static List<String> getAllRoles() {
        return ReflectionUtil.getAllValuesFromPublicStaticFinalFieldsWithTypeAndStartingWith(
                RoleConstants.class, String.class, "ROLE_");
    }

    private RoleConstants() { }

}
