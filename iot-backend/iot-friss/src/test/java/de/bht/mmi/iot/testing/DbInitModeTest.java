package de.bht.mmi.iot.testing;

import de.bht.mmi.iot.config.DbInitMode;
import org.junit.Assert;
import org.junit.Test;

import java.util.regex.Pattern;

import static org.junit.Assert.assertEquals;

public class DbInitModeTest {

    private static final Pattern enumNamePattern = Pattern.compile("^[A-Z]+(_[A-Z]+)*$");

    private final Pattern propertyValuePattern = Pattern.compile("^[a-z]+(-[a-z]+)*$");

    @Test
    public void validEnumNames() {
        final DbInitMode[] dbInitModes = DbInitMode.values();
        for (DbInitMode dbInitMode : dbInitModes) {
            validEnumName(dbInitMode.name());
        }
    }

    @Test
    public void validPropertyValues() {
        final DbInitMode[] dbInitModes = DbInitMode.values();
        for (DbInitMode dbInitMode : dbInitModes) {
            validPropertyValue(dbInitMode.getPropertyValue());
        }
    }

    @Test
    public void enumNamesMatchesPropteryValue() {
        final DbInitMode[] dbInitModes = DbInitMode.values();
        for (DbInitMode dbInitMode : dbInitModes) {
            assertEquals(dbInitMode, DbInitMode.fromPropertyValue(dbInitMode.getPropertyValue()));
        }
    }

    private void validEnumName(String enumName) {
        Assert.assertTrue(String.format("%s does not match pattern %s", enumName, enumNamePattern.pattern()),
                matchesPattern(enumName, enumNamePattern));
    }

    private void validPropertyValue(String propertyValue) {
        Assert.assertTrue(String.format("%s does not match pattern %s", propertyValue, propertyValuePattern.pattern()),
                matchesPattern(propertyValue, propertyValuePattern));
    }

    private boolean matchesPattern(String str, Pattern pattern) {
        return pattern.matcher(str).matches();
    }

}
