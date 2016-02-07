package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import org.springframework.cache.Cache;

public interface CacheService {

    Iterable<String> getAllCacheNames();

    Cache getOneByCacheName(String cacheName) throws EntityNotFoundException;

    void clearOne(String cacheName) throws EntityNotFoundException;

    void clearAll();

}
