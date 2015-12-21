package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalAmount;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class BulkMessageService {

    @Autowired
    private Random random;

    @Autowired
    private PhysicalValueService physicalValueService;

    private static final ZoneId ZONE_ID = ZoneId.of("Europe/Berlin");

    private static final TemporalAmount START_END_DURATION = Duration.ofMillis(100);


    public BulkMessage getDummyBulkMessage(SensorType sensorType, int numMinValues, int numMaxValues) {
        assert numMaxValues >= numMinValues;

        final int randomNumValue = (numMinValues != numMaxValues) ? numMinValues + (random.nextInt(numMaxValues - numMinValues) + 1) : numMinValues;
        return getDummyBulkMessage(sensorType, randomNumValue);
    }

    public BulkMessage getDummyBulkMessage(SensorType sensorType, int numValues) {
        assert numValues > 0;
       
        final ZonedDateTime startDateTime = ZonedDateTime.now(ZONE_ID);
        final ZonedDateTime endDateTime = startDateTime.plus(START_END_DURATION);

        final BulkMessage bulkMessage = new BulkMessage();
        bulkMessage.setStartDateTime(startDateTime);
        bulkMessage.setEndDateTime(endDateTime);
        bulkMessage.setLocation("Berlin");
        bulkMessage.setSensorID("1");
        bulkMessage.setGatewayName("BeuthGW1");
        switch(sensorType) {
            case SCALAR:
                bulkMessage.setSensorID("0");
                bulkMessage.setValues(getDummyScalars(numValues));
        	    break;
            case ORIENTATION:
	    	    bulkMessage.setValues(getDummyOrientations(numValues));
    	        break;
            case ACCELERATION:
                bulkMessage.setValues(getDummyAccelerations(numValues));
                break;
            case LOCATION:
	    	    bulkMessage.setValues(getDummyLocations(numValues));
    	        break;
            default:
                throw new IllegalArgumentException(String.format("Unsupported sensor type %s", sensorType.name()));
        }
        return bulkMessage;
    }
	
	private List<SensorLocation> getDummyLocations(int numMaxValues) {
		final List<SensorLocation> physicalValues = new ArrayList<>(numMaxValues);
		for (int i = 0; i < numMaxValues; ++i) {
            physicalValues.add(physicalValueService.getDummyLocation());
        }
		return physicalValues;
	}

	private List<SensorOrientation> getDummyOrientations(int numMaxValues) {
		final List<SensorOrientation> physicalValues = new ArrayList<>(numMaxValues);
		for (int i = 0; i < numMaxValues; ++i) {
            physicalValues.add(physicalValueService.getDummyOrientation());
        }
		return physicalValues;
	}

	private List<SensorScalar> getDummyScalars(int numMaxValues) {
		final List<SensorScalar> physicalValues = new ArrayList<>(numMaxValues);
		for (int i = 0; i < numMaxValues; ++i) {
            physicalValues.add(physicalValueService.getDummyScalar());
        }
		return physicalValues;
	}
	
	private List<SensorAcceleration> getDummyAccelerations(int numMaxValues) {
		final List<SensorAcceleration> physicalValues = new ArrayList<>(numMaxValues);
		for (int i = 0; i < numMaxValues; ++i) {
            physicalValues.add(physicalValueService.getDummyAcceleration());
        }
		return physicalValues;
	}
}
