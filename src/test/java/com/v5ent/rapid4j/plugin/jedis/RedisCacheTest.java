package com.v5ent.rapid4j.plugin.jedis;

import com.v5ent.rapid4j.plugin.redis.RedisCache;
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
    private RedisCache redisCache;


    @Test
    public void testSet() {
        redisCache.set("anchor", "Mignet", 1 * 60 * 24);
    }

    @Test
    public void testGet() {
        System.out.printf("anchor:%s \n",redisCache.get("anchor"));
    }
}
