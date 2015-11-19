package com.v5ent.rapid4j.test.spring;

import javax.annotation.Resource;

import org.junit.Test;

import com.v5ent.rapid4j.test.TestSupport;

/**
 * SpiderTest : 爬虫测试类
 *
 * @author Mignet
 * @since 2014-10-27 22:44
 */
public class SpiderTest extends TestSupport {

    @Resource
    private Spider spider;

    @Test
    public void testInjectSpider() throws Exception {
        System.out.println(spider);
    }
}
