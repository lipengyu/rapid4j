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
public class RedisManagerTest extends TestSupport {


    @Resource
    private RedisManager redisManager;


    @Test
    public void testSet() {
    	redisManager.init();
    	redisManager.set("anchor".getBytes(), "Mignet".getBytes(), 1 * 60 * 24);
    }

    @Test
    public void testGet() {
    	redisManager.init();
        System.out.printf("anchor:%s \n",redisManager.get("anchor".getBytes()));
    }
}
