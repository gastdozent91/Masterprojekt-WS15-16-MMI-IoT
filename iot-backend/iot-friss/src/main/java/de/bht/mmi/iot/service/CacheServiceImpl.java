package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

@Service
public class CacheServiceImpl implements CacheService {

    @Autowired
    private CacheManager cacheManager;

    @Override
    public Iterable<String> getAllCacheNames() {
        return cacheManager.getCacheNames();
    }

    @Override
    public Cache getCache(String cacheName) throws EntityNotFoundException {
        final Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            throw new EntityNotFoundException(String.format("Cache with name: '%s' does not exists", cacheName));
        }
        return cache;
    }

    @Override
    public void clearOne(String cacheName) throws EntityNotFoundException {
        getCache(cacheName).clear();
    }

    @Override
    public void clearAll() {
        for (String cacheName : getAllCacheNames()) {
            cacheManager.getCache(cacheName).clear();
        }
    }

}
