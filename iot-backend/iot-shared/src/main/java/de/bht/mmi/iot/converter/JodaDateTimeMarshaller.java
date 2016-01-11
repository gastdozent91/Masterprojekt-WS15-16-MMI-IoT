package de.bht.mmi.iot.converter;

import com.amazonaws.services.dynamodbv2.datamodeling.JsonMarshaller;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.ISODateTimeFormat;

public class JodaDateTimeMarshaller extends JsonMarshaller<DateTime> {

    private static final DateTimeFormatter ISO_FORMATTER = ISODateTimeFormat.dateTime();

    @Override
    public String marshall(DateTime obj) {
        return ISO_FORMATTER.print(obj);
    }

    @Override
    public DateTime unmarshall(Class<DateTime> clazz, String json) {
        return ISO_FORMATTER.parseDateTime(json);
    }
}
