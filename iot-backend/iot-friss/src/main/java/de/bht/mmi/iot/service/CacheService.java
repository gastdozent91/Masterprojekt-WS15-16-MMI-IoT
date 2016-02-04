package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;

public interface CacheService {

    Iterable<String> getAllCacheNames();

    void clearOne(String cacheName) throws EntityNotFoundException;

    void clearAll();

}
