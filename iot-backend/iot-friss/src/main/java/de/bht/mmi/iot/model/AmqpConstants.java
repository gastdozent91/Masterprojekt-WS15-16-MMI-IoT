package de.bht.mmi.iot.model;

public final class AmqpConstants {

    public static final String EXAMPLE_QUEUE_NAME = "example";

    public static final String EXAMPLE_EXCHANGE_NAME = "example.exch";

    public static final String EXAMPLE_ROUTING_KEY = "testing";

    public static final String DATA_TOPIC_EXCHANGE_NAME = "topic_logs";

    public static final String DATA_TOPIC_EXCHANGE_NAME2 = "topic_logs2";

    public static final String ALL_MESSAGE_ROUTING_KEY = "#";

    public static final String DATA_GEO_TOPIC_ROUTING_KEY = "data.geo";

    public static final String FRISS_EXCHANGE_NAME = "friss_exch";

    public static final String FRISS_EDITED_EXCHANGE_NAME = "friss_edited_exch";

    public static final String FRISS_EDITED_QUEUE_NAME = "friss_edited_queue";

    private AmqpConstants() { }

}
