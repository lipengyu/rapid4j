package com.v5ent.rapid4j.plugin.jedis;

import com.v5ent.rapid4j.plugin.redis.RedisManager;
import com.v5ent.rapid4j.test.TestSupport;

import org.junit.Test;

import javax.annotation.Resource;

/**
 * JedisTest : 测试 jedis 功能
 *
 * @author Mignet
 * @since 2015-03-20 10:32
 */
public class RedisCacheTest extends TestSupport {


    @Resource
    private RedisManager redisCache;


    @Test
    public void testSet() {
    	redisCache.init();
        redisCache.set("anchor".getBytes(), "Mignet".getBytes(), 1 * 60 * 24);
    }

    @Test
    public void testGet() {
    	redisCache.init();
        System.out.printf("anchor:%s \n",redisCache.get("anchor".getBytes()));
    }
}
