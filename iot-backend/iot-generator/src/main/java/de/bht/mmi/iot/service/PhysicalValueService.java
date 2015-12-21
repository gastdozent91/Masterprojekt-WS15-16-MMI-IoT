package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PhysicalValueService {

    @Autowired
    private Random random;

    private static final int RANDOM_UPPER_BOUND = 30;

    public SensorScalar getDummyScalar() {
        return new SensorScalar(random.nextInt(RANDOM_UPPER_BOUND));
    }

    public SensorAcceleration getDummyAcceleration() {
        return new SensorAcceleration(random.nextInt(RANDOM_UPPER_BOUND),random.nextInt(RANDOM_UPPER_BOUND),random.nextInt(RANDOM_UPPER_BOUND));
    }
	public SensorOrientation getDummyOrientation() {
        return new SensorOrientation(random.nextInt(RANDOM_UPPER_BOUND),random.nextInt(RANDOM_UPPER_BOUND),random.nextInt(RANDOM_UPPER_BOUND),random.nextInt(RANDOM_UPPER_BOUND));

	}
	public SensorLocation getDummyLocation() {
        return new SensorLocation(random.nextInt(RANDOM_UPPER_BOUND),random.nextInt(RANDOM_UPPER_BOUND));
	}
}
