package com.v5ent.rapid4j.plugin.jedis;

import javax.annotation.Resource;

import org.junit.Test;

import com.v5ent.rapid4j.core.util.SerializeUtils;
import com.v5ent.rapid4j.plugin.redis.RedisManager;
import com.v5ent.rapid4j.test.TestSupport;

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
    public void testSetObject() {
    	User u = new User();
    	u.setId(1001);
    	u.setUsername("Mignet");
    	u.setState("N");
    	redisManager.set("user:1001".getBytes(), SerializeUtils.serialize(u), 1 * 60 * 24);
    }
    
    @Test
    public void testGetObject() {
        System.out.printf("[user:1001]:%s \n",SerializeUtils.deserialize(redisManager.get("user:1001".getBytes())));
    }
    
    @Test
    public void testSet() {
    	redisManager.set("anchor", "Mignet", 1 * 60 * 24);
    }

    @Test
    public void testGet() {
        System.out.printf("anchor:%s \n",redisManager.get("anchor"));
    }
}
