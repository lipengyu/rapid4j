package com.v5ent.rapid4j.test.service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;

import javax.annotation.Resource;

import org.junit.Test;

import com.v5ent.rapid4j.core.util.PasswordHash;
import com.v5ent.rapid4j.test.TestSupport;
import com.v5ent.rapid4j.web.model.User;
import com.v5ent.rapid4j.web.service.UserService;

public class UserServiceTest extends TestSupport {

    @Resource
    private UserService userService;

    @Test
    public void testInsert() throws NoSuchAlgorithmException, InvalidKeySpecException {
    	start();
            User model = new User();
            model.setUsername("Mignet");
            model.setPassword(PasswordHash.createHash("123456"));
            model.setCreateTime(new Date());
            userService.insert(model);
        end();
    }

}
