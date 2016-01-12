package de.bht.mmi.iot.model;

public final class RoleConstants {

    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final String ROLE_USER = "ROLE_USER";

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

    private RoleConstants() { }

}
