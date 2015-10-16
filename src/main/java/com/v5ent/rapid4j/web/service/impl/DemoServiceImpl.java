package com.v5ent.rapid4j.web.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.v5ent.rapid4j.web.service.DemoService;
/**
 * 使用@Service标签即可以告诉dubbo在扫描时将之作为dubbo service，加载初始化之。<br>
 * 调用时在Controller或者Service使用@Reference即可注入
 * @author Mignet
 */
@Service
public class DemoServiceImpl implements DemoService {
	 
	@Override
    public String sayHello(String name) {
        return "Hello " + name;
    }
 
}
