package com.v5ent.rapid4j.web.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.v5ent.rapid4j.web.service.DemoService;

@Service
public class DemoServiceImpl implements DemoService {
	 
	@Override
    public String sayHello(String name) {
        return "Hello " + name;
    }
 
}
