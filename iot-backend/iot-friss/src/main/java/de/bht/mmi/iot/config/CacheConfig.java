package de.bht.mmi.iot.config;

import net.sf.ehcache.config.CacheConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.cache.interceptor.SimpleKeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import static de.bht.mmi.iot.constants.CacheConstants.*;

@Configuration
@EnableCaching
@ComponentScan("de.bht.mmi.iot.*")
public class CacheConfig {

    @Bean(destroyMethod = "shutdown")
    public net.sf.ehcache.CacheManager ehCacheManager() {
        final net.sf.ehcache.config.Configuration config = new net.sf.ehcache.config.Configuration();
        config.addCache(createCacheConfig(CACHE_SENSOR_ACTIVE,
                DEFAULT_CACHE_MAX_ENTRIES,
                DEFAULT_CACHE_TIME_TO_LIVE,
                DEFAULT_CACHE_POLICY));
        return net.sf.ehcache.CacheManager.newInstance(config);
    }

    @Bean
    public org.springframework.cache.CacheManager cacheManager() {
        return new EhCacheCacheManager(ehCacheManager());
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new SimpleKeyGenerator();
    }

    private CacheConfiguration createCacheConfig(String name, long maxEntries, long ttl, String cachePolicy) {
        final CacheConfiguration config = new CacheConfiguration();
        config.setName(name);
        config.setTimeToIdleSeconds(ttl);
        config.setTimeToLiveSeconds(ttl);
        config.setMaxEntriesLocalHeap(maxEntries);
        config.setMemoryStoreEvictionPolicy(cachePolicy);
        return config;
    }

}
